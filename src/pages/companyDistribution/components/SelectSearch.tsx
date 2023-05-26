import React, { useState, useEffect, Fragment } from 'react';
import { Select } from 'antd';
import { CompanyType } from '@/Map/constants';
import { requestCompany } from '@/services/search';
import { drawBounds } from '@/Map/constants';
import styles from './index.less';
export type CityListType = { cityId: string; cityName: string }[];
export type TypeListType = { typeId: string; name: string }[];
export type SearchListType = {
  cityList: CityListType;
  typeList: TypeListType;
  companyList: CompanyType[];
};
type PropsType = {
  children?: React.ReactNode;
  map: AMap.Map;
  setFindValue: React.Dispatch<React.SetStateAction<CompanyType[]>>;
  dataList: SearchListType;
};
const SelectSearch: React.FC<PropsType> = (props) => {
  const [searchValue, setSearchValue] = useState({
    cityValue: '',
    typeValue: '',
    companyValue: '',
  });
  const { setFindValue, map, dataList } = props;
  const [searchList, setSearchList] = useState<SearchListType>({
    cityList: dataList.cityList.map((item) => {
      return { cityId: item.cityId, cityName: item.cityName };
    }),
    typeList: dataList.typeList,
    companyList: dataList.companyList,
  });
  const handleChange = (value: string, number: number) => {
    switch (number) {
      case 1:
        setSearchValue({ ...searchValue, cityValue: value });
        break;
      case 2:
        setSearchValue({ ...searchValue, typeValue: value });
        break;
      case 3:
        setSearchValue({ ...searchValue, companyValue: value });
        value &&
          setFindValue([
            {
              ...searchList.companyList.find(
                (item) => item.companyId == value,
              )!,
              selectType: 3,
            },
          ]);
    }
  };

  useEffect(() => {
    (async function () {
      const companyList: CompanyType[] = await requestCompany({
        cityId: searchValue.cityValue,
        typeIdList: [searchValue.typeValue],
      });
      if (Array.isArray(companyList)) {
        setSearchList({
          ...searchList,
          companyList: companyList,
        });
        setFindValue(companyList);
        setSearchValue({ ...searchValue, companyValue: '' });
      }
      console.log(companyList);
    })();
    map?.getAllOverlays('polygon')[0] &&
      map.remove(map.getAllOverlays('polygon')[0]);
    if (map) {
      const city = searchList.cityList.find(
        (item) => item.cityId == searchValue.cityValue,
      );
      searchValue.cityValue
        ? drawBounds({
            map: map,
            level: 'city',
            searchName: city?.cityName,
          })
        : drawBounds({ map: map });
    }
  }, [searchValue.cityValue, searchValue.typeValue, map]);
  return (
    <Fragment>
      <div className={styles.inputSearch} {...props}>
        区域：
        <Select
          defaultValue={'江西省'}
          // onChange={handleAreaChange}
          options={[{ 江西: '123456789' }]}
          disabled={true}
          // placeholder="请选择"
        />
        <Select
          {...props}
          value={searchValue.cityValue}
          onChange={(e) => handleChange(e, 1)}
          showSearch
          allowClear
          placeholder="请选择市区"
          options={searchList.cityList}
          optionFilterProp={'cityName'}
          fieldNames={{ label: 'cityName', value: 'cityId' }}
        />
      </div>
      <div className={styles.inputSearch} {...props}>
        类型：
        <Select
          {...props}
          value={searchValue.typeValue}
          onChange={(e) => handleChange(e, 2)}
          showSearch
          allowClear
          placeholder="请选择类型"
          options={searchList.typeList}
          optionFilterProp={'name'}
          fieldNames={{ label: 'name', value: 'typeId' }}
        />
      </div>
      <div className={styles.inputSearch} {...props}>
        公司：
        <Select
          {...props}
          style={{ width: 'calc(84.8% - 5px)' }}
          value={searchValue.companyValue}
          onChange={(e) => handleChange(e, 3)}
          showSearch
          allowClear
          placeholder="请选择"
          options={searchList.companyList}
          optionFilterProp={'name'}
          fieldNames={{ label: 'name', value: 'companyId' }}
        />
      </div>
    </Fragment>
  );
};

export default SelectSearch;

import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Spin, Button, Space, Table } from 'antd';
import Title from '@/components/Title';
import { companyType } from '@/Map/constants';
import { SearchOutlined } from '@ant-design/icons';
import { mapColor } from '@/Map/constants';
import Chart from '@/components/Echart';
import { requestCompany } from '@/services/search';
import Select from '@/components/Select';
// import SelectSearch, { typeListType } from './selectSearch';
// import { columns, firstOption, secondOption, thirdOption } from './constants';
import searchStyles from '../companySearch/index.less';
// const { Search } = Input;
// const content = [
//   {
//     label: '相关企业数',
//     value: 2735,
//     valueStyle: { color: '#13c2c2' },
//     unit: '家',
//   },
//   {
//     label: '相关企业专利数量',
//     value: 46722,
//     style: { top: '14px' },
//     valueStyle: { color: '#3436c7' },
//     unit: '个',
//   },
//   {
//     label: '相关企业中上市公司数量',
//     valueStyle: { color: 'green' },
//     style: { top: '24px' },
//     value: 119,
//     unit: '家',
//   },
// ];
const BusinessDetail: React.FC = (props) => {
//   const [typeList, setTypeList] = useState<typeListType>([]);
  const [companyList, setCompanyList] = useState<{
    loading: boolean;
    data: companyType[];
  }>({ loading: false, data: [] });
  const [selectValue, setSelectValue] = useState<string>('');

  useEffect(() => {
    getCompanyList();
  }, []);

  const getCompanyList = async () => {
    setCompanyList({ loading: true, data: [] });
    const companyList: companyType[] = await requestCompany({ typeId: '1' });
    Array.isArray(companyList)
      ? setCompanyList({ loading: false, data: companyList })
      : setCompanyList({ loading: false, data: [] });
  };
  if (companyList.loading) {
    return (
      <Spin
        size="large"
        spinning={companyList.loading}
        tip={'加载中'}
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
        }}
      />
    );
  }
  const handleChange = (value: string) => {
        setSelectValue(value);
  }
  const handleClick = () => {
        console.log(selectValue);
  }
  return (
    <div className={searchStyles.wrapper}>
      <div className={searchStyles.search} style={{ alignItems: 'center' }}>
        <Select
          value={selectValue}
          onChange={(e: any) => handleChange(e)}
          placeholder="请选择"
          options={companyList.data}
          optionFilterProp={'name'}
          fieldNames={{ label: 'name', value: 'companyId' }}
        />
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={handleClick}
        />
      </div>
      <Row
        style={{
          position: 'relative',
          height: '575px',
          top: '20px',
          marginLeft: '10px',
          background: '#FFFFFF',
        }}
      ></Row>
    </div>
  );
};

export default BusinessDetail;

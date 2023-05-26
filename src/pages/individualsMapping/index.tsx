import React, { useEffect, useState } from 'react';
import Chart from '@/components/Echart';
import styles from './index.less';
import Select from '@/components/Select';
import { CompanyType } from '@/Map/constants';
import { requestCompany, requestSearchRelation } from '@/services/search';
import {
  GraphType,
  getSymbolValue,
  DataType,
} from '@/pages/clusterMapping/constants';
import { handleTagCloud, getOption } from './constants';
const IndividualsMapping: React.FC = (props) => {
  const [graphData, setGraphData] = useState<GraphType>();
  const [companyList, setCompanyList] = useState<{
    loading: boolean;
    data: CompanyType[];
  }>({ loading: false, data: [] });
  const [selectValue, setSelectValue] = useState<string>('');
  useEffect(() => {
    getCompanyList();
  }, []);

  const getRelationData = async (param: string) => {
    try {
      const res = await requestSearchRelation(param);
      let valueArr = res.data.map((item: DataType) => {
        item.value = Number(item.value);
        return item.value;
      });
      let symbolValue = getSymbolValue(valueArr);
      res.data.forEach((node: DataType, index: number) => {
        node.symbolSize = symbolValue[index];
        node.label = {
          show: node.symbolSize ? node.symbolSize > 30 : false,
        };
      });
      setGraphData(res);
    } catch (err) {
      console.log(err);
    }
  };

  const option = getOption(graphData);

  const getCompanyList = async () => {
    try {
      const res: CompanyType[] = await requestCompany({});
      console.log(companyList.data, 'wem');
      if (Array.isArray(res)) {
        setCompanyList({ loading: false, data: res });
        handleTagCloud({
          setSelectValue,
          getRelationData,
          data: res,
        });
      } else {
        setCompanyList({ loading: false, data: [] });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (value: string) => {
    setSelectValue(value);
    setGraphData(void 0);
  };
  const handleClick = () => {
    getRelationData(selectValue);
  };

  return (
    <div className={styles.wrapper}>
      <Chart option={option} style={{ height: '100%' }} />

      <div className={styles.left}>
        <Select
          value={selectValue}
          onChange={(e: any) => handleChange(e)}
          options={companyList.data}
          fieldNames={{ label: 'name', value: 'name' }}
          handleClick={handleClick}
        />
        <div className="tagCloud"></div>
      </div>
    </div>
  );
};

export default IndividualsMapping;

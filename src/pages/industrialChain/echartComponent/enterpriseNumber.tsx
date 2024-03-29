import React, { useState, useEffect } from 'react';
import Chart from '@/components/Echart';
import { DataType } from '../../clusterMapping/constants';
import {
  EnterpriseDataType,
  EnterpriseValuesType,
  getEnterpriseOption,
  ChartRefType,
} from './constant';
import { requestAllRelationships, PatentStatisticsVO } from '@/services/search';

export const EnterpriseNumber: React.FC<{
  componentNumber?: number;
  chartRef?: React.RefObject<ChartRefType>;
  styles?: { [key: string]: string };
  patentStatisticsV?: PatentStatisticsVO;
}> = (props) => {
  const [data, setData] = useState<EnterpriseDataType>();
  const {
    componentNumber = 1,
    chartRef,
    styles = {},
    patentStatisticsV,
  } = props;
  useEffect(() => {
    if (componentNumber == 1) {
      getRelationData();
    } else if (patentStatisticsV) {
      let category = patentStatisticsV.category
        .filter((item, index) => {
          return patentStatisticsV.value[index].value != 0;
        })
        .map((item) => {
          return { name: item };
        });
      let values = patentStatisticsV.value.filter((item) => item.value != 0);
      let total = patentStatisticsV.total;
      console.log({ total, category, values }, '--');
      setData({ total, category, values });
    }
  }, []);
  const getRelationData = async () => {
    try {
      let temp: EnterpriseValuesType[] = [];
      const res = await requestAllRelationships();
      res?.category.map((item: { name: string }, index: number) => {
        let count = 0;
        res?.data.map((item: DataType) => {
          if (item.category === index) {
            count++;
          }
        });
        temp.push({ value: count, name: item.name });
      });
      setData({ total: res.data.length, category: res.category, values: temp });
    } catch (err) {
      console.log(err);
    }
  };
  const option = data ? getEnterpriseOption(data, componentNumber) : {};
  return <Chart option={option} chartRef={chartRef} styles={styles} />;
};

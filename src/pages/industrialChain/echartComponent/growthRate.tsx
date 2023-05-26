import React, { useState, useEffect } from 'react';
import Chart from '@/components/Echart';
import { getGrowthRateOption } from './constant';
export const GrowthRate: React.FC<{ componentNumber?: number }> = (props) => {
  const [data, setData] = useState<number>();
  const { componentNumber = 1 } = props;
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      setData(1);
    } catch (err) {
      console.log(err);
    }
  };
  const option = data ? getGrowthRateOption(data, componentNumber) : {};
  return <Chart option={option} style={{ height: '27vh' }} />;
};

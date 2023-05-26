import React, { useState, useEffect } from 'react';
import Chart from '@/components/Echart';
import { getMapOption } from './constant';
export const MapDistribution: React.FC<{ componentNumber?: number }> = (
  props,
) => {
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
  const option = data ? getMapOption(data, componentNumber) : {};
  return <Chart option={option} style={{ height: '30vh' }} />;
};

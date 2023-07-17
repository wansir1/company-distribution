import React, { useState, useEffect } from 'react';
import Chart from '@/components/Echart';
import { getMapOption, ChartRefType } from './constant';
export const MapDistribution: React.FC<{
  componentNumber?: number;
  chartRef?: React.RefObject<ChartRefType>;
  styles?: { [key: string]: string };
}> = (props) => {
  const [data, setData] = useState<number>();
  const { componentNumber = 1, chartRef, styles = {} } = props;
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
  return <Chart option={option} chartRef={chartRef} styles={styles} />;
};

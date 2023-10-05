import React, { useState, useEffect, useRef } from 'react';
import Chart from '@/components/Echart';
import { getGrowthRateOption, ChartRefType } from './constant';
export const GrowthRate: React.FC<{
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
  const option = data ? getGrowthRateOption(data, componentNumber) : {};
  return (
    <>
      <Chart option={option} chartRef={chartRef} styles={styles} />
    </>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import Chart from '@/components/Echart';
import { getGrowthRateOption, ChartRefType } from './constant';
import { GrowthRateVO } from '@/services/search';
export const GrowthRate: React.FC<{
  componentNumber?: number;
  chartRef?: React.RefObject<ChartRefType>;
  styles?: { [key: string]: string };
  growthRateV?: GrowthRateVO;
  growthType?: string;
}> = (props) => {
  const [data, setData] = useState<GrowthRateVO>();
  const {
    componentNumber = 1,
    chartRef,
    styles = {},
    growthType = '1',
    growthRateV,
  } = props;
  useEffect(() => {
    growthRateV && setData(growthRateV);
  }, [growthRateV]);
  const option = data
    ? getGrowthRateOption(data, componentNumber, growthType)
    : {};
  return (
    <>
      <Chart option={option} chartRef={chartRef} styles={styles} />
    </>
  );
};

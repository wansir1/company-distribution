import React, { useState, useEffect } from 'react';
import Chart from '@/components/Echart';
import { getMapOption, ChartRefType } from './constant';
import { DistributionVO } from '@/services/search';
export const MapDistribution: React.FC<{
  componentNumber?: number;
  chartRef?: React.RefObject<ChartRefType>;
  styles?: { [key: string]: string };
  distributionV?: DistributionVO;
}> = (props) => {
  const [data, setData] = useState<DistributionVO>();
  const { componentNumber = 1, chartRef, styles = {}, distributionV } = props;
  useEffect(() => {
    distributionV && setData(distributionV);
  }, [distributionV]);
  const option = data ? getMapOption(data, componentNumber) : {};
  return <Chart option={option} chartRef={chartRef} styles={styles} />;
};

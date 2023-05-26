import React, { useEffect, useState } from 'react';
import Chart from '@/components/Echart';
import styles from './index.less';
import { requestAllRelationships } from '@/services/search';
import { GraphType, DataType, getSymbolValue, getOption } from './constants';
const ClusterMapping: React.FC = (props) => {
  const [graphData, setGraphData] = useState<GraphType>();
  useEffect(() => {
    getRelationData();
  }, []);
  const getRelationData = async () => {
    try {
      const res = await requestAllRelationships();
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
      console.log(res, 'jjjjj', valueArr, symbolValue);
    } catch (err) {
      console.log(err);
    }
  };

  const option = getOption(graphData);
  return (
    <div className={styles.wrapper}>
      <Chart option={option} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default ClusterMapping;

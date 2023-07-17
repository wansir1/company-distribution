import ReactECharts from 'echarts-for-react';
import { Fragment } from 'react';
import * as echarts from 'echarts';

const Chart = (props) => {
  const { option, styles = {}, chartRef } = props; //option 的值由父组件传入
  return (
    option && (
      <ReactECharts
        key={Date.now()}
        option={option}
        style={{ height: '100%', width: '100%', ...styles }}
        ref={chartRef}
        {...props}
      />
    )
  );
};
export default Chart;

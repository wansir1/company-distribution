import ReactECharts from 'echarts-for-react';
import { Fragment } from 'react';
import * as echarts from 'echarts';

const EChart = (props) => {
  const { option, style } = props; //option 的值由父组件传入

  return (
    <Fragment>
      {option && (
        <ReactECharts key={Date.now()} option={option} style={style} {...props} />
      )}
    </Fragment>
  );
};
export default EChart;

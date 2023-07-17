import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Modal, Button } from 'antd';
import styles from './index.less';
import { ECharts } from 'echarts';
import ModalPre from './Modal';
import ReactECharts from 'echarts-for-react';
import {
  EnterpriseNumber,
  GrowthRate,
  MapDistribution,
} from '../industrialChain/echartComponent';

var option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
    },
  ],
};

const IndustrialChainPre: React.FC = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [visible, setVisible] = useState(false);
  const [select, setSelect] = useState<number | null>(null);
  const chartRef = useRef<ReactECharts>(null);
  const componentMapping: { [key: number]: React.ReactNode } = {
    1: (
      <Fragment>
        {option && <ReactECharts key={Date.now()} option={option} />}
      </Fragment>
    ),
    2: (
      <div
        className={`${styles.test}`}
        onClick={() => {
          setVisible(true);
          setSelect(2);
        }}
        style={{ background: 'green' }}
      >
        Display a modal dialog at 20px to Top
      </div>
    ),
    // 添加更多的组件标识和对应的子组件
  };
  useEffect(() => {
    if (chartRef?.current && modal2Open) {
      const myChart = chartRef.current.getEchartsInstance();
      myChart.setOption({
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'bar',
          },
        ],
      });
    }
  }, [modal2Open]);
  return (
    <>
      <div className="modal" style={{ background: 'yellow' }}>
        <div
          className={`${styles.test} ${modal2Open ? styles.testEnter : ''}`}
          onClick={() => {
            setVisible(true);
            setSelect(1);
          }}
        >
          <ReactECharts key={Date.now()} option={option} ref={chartRef} />
        </div>
        <div
          className={`${styles.test}`}
          onClick={() => {
            setVisible(true);
            setSelect(2);
          }}
          style={{ background: 'green', top: '100px' }}
        >
          Display a modal dialog at 20px to Top
        </div>
        <ModalPre visible={visible} onCancel={() => setVisible(false)}>
          {select && componentMapping[select]}
        </ModalPre>
        <Button type="primary" onClick={() => setModal2Open(!modal2Open)}>
          Vertically centered modal dialog
        </Button>
      </div>
    </>
  );
};
export default IndustrialChainPre;

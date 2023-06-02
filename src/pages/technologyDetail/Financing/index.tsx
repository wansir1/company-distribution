import React from 'react';
import Title from '@/components/Title';
import { Liquid, Pie } from '@ant-design/plots';
import { pieConfig } from '@/pages/technologyDetail/Financing/constants';
const percent = 0.8;
let newPercent: string = (percent * 100).toFixed(2);
const liquidConfig: any = {
  width: 160,
  height: 160,
  autoFit: false,
  percent: percent,
  outline: {
    border: 2,
    distance: 4,
  },
  statistic: {
    title: {
      offsetY: 25,
      customHtml: () => {
        return (
          <span style={{ fontSize: '16px', fontWeight: 'lighter' }}>
            超过<span style={{ color: 'FF4500' }}> {newPercent}%</span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;的同行
          </span>
        );
      },
    },
    content: {
      customHtml: () => {
        return '';
      },
    },
  },
  wave: {
    length: 128,
  },
  radius: 1,
};
const Financing: React.FC = () => {
  return (
    <div>
      <Title text="融资情况" style={{ fontSize: '16px' }} />
      <div
        style={{
          width: '654',
          height: '245',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Pie {...pieConfig} />
        <div style={{ position: 'absolute', left: '212px' }}>
          <Liquid {...liquidConfig} />
        </div>
      </div>
      <span style={{ marginLeft: 10 }}>
        融资情况：该企业拥有融资活动&nbsp;
        <span style={{ color: '#FFA500' }}>3</span>
        &nbsp;项，超过&nbsp;
        <span style={{ color: '#FFA500' }}>{newPercent}%</span>
        &nbsp;的同行。
      </span>
    </div>
  );
};

export default Financing;

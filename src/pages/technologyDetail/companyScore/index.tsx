import React from 'react';
import Title from '@/components/Title';
import { Liquid } from '@ant-design/plots';
const liquidConfig = {
  percent: 0.7916,
  autoFit: false,
  width: 624,
  height: 240,
  outline: {
    border: 4,
    distance: 8,
  },
  wave: {
    length: 128,
  },
  // radius:0.75
};
const CompanyScore: React.FC = () => {
  return (
    <div>
      <Title text="青岛特锐德电气股份有限公司" style={{ fontSize: '16px' }} />
      <Liquid {...liquidConfig} />
      <span style={{ color: '#808080', fontSize: 10, marginLeft: 16 }}>
        a.企业综合评分:根据企业技术实力指数,资本实力指数,人员规模指数,等指标加权计算
        <br />
      </span>
      <span style={{ color: '#236B8E', marginLeft: 16 }}>
        潜在竞合企业中：上市公司市值的范围[30.5亿-644亿]，中位数 68.27亿;
      </span>
    </div>
  );
};

export default CompanyScore;

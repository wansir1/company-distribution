import React from 'react';
import { Radar } from '@ant-design/plots';
import { radarConfig } from '@/pages/technologyDetail/powerChart/constants';
const PowerChart: React.FC = () => {
  return (
    <div>
      <Radar {...radarConfig} />
      <div style={{ marginLeft: 16, marginTop: 8 }}>
        <span style={{ color: '#808080', fontSize: 10 }}>
          a.技术领域投资热度指数:根据企业所涉及的技术领域计算;
          <br />
          b.技术实力指数:根据企业专利数量以及在竞品中的相对排名计算;
          <br />
          c.资本实力指数:根据企业注册资本金,融资以及在竞品中的相对排名计算;
          <br />
          d.人员规模指数:根据企业社保人数以及在竞品中的相对排名计算;
          <br />
          e.专利/资本集中度指数:根据赛道内专利和资本的集中度情况计算,集中度超过一定数值,专利/资本集中度指数会相应下降;
          <br />
          g.资本平均增速指数:根据赛道内企业,专利,融资增长情况计算;
          <br />
        </span>
      </div>
    </div>
  );
};

export default PowerChart;

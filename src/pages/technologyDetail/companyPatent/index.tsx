import React from 'react';
import { Space, Divider, Table } from 'antd';
import Title from '@/components/Title';
import styles from './index.less';
import {
  patentNumber_Data,
  patentNumberColumns,
} from '@/pages/technologyDetail/companyPatent/constants';
import { Line } from '@ant-design/plots';
import { lineConfig } from '@/pages/technologyDetail/companyPatent/constants';
// PropsType给上面传下来的props变量定义数据类型
type PropsType = {};
//业务方向和技术方向的假数据
let technologyData: string[] = ['电气', '开关柜', '变压器', '断路器', '网络'];
let businessData: string[] = [
  '配电柜',
  '电器设备',
  '变电站',
  '配电箱',
  '隔离开关',
  '家用电器',
];
const CompanyPatent: React.FC = () => {
  return (
    <>
      <Title
        text="业务技术方向"
        style={{ marginBottom: '3px', fontSize: '16px' }}
      />
      <div className={styles.businessInfo}>
        <p
          style={{
            color: '	rgba(59,46,126,0.9)',
            display: 'inline-block',
            marginTop: '8px',
            fontWeight: 'bold',
            textAlign: 'left',
          }}
        >
          核心业务方向：
          <span style={{ marginLeft: '8px', color: '#808080' }}>
            <Space>
              {businessData.map((item) => {
                return item;
              })}
            </Space>
          </span>
        </p>
        <Divider style={{ margin: '-6px 0px 8px 0px' }}></Divider>
        <p
          style={{
            color: '	rgba(59,46,126,0.9)',
            display: 'inline-block',
            fontWeight: 'bold',
            textAlign: 'left',
          }}
        >
          核心技术方向：
          <span style={{ marginLeft: '8px', color: '#808080' }}>
            <Space>
              {technologyData.map((item) => {
                return item;
              })}
            </Space>
          </span>
        </p>
      </div>

      <Title
        text="技术路径矩阵(专利)"
        style={{ marginBottom: '3px', marginTop: '12px', fontSize: '16px' }}
      />
      <Table
        className=""
        columns={patentNumberColumns}
        dataSource={patentNumber_Data}
        pagination={false}
        size="small"
      />

      <Title
        text="技术路径分布图"
        style={{ marginBottom: '16px', marginTop: '12px', fontSize: '16px' }}
      />
      <Line {...lineConfig} />
    </>
  );
};

export default CompanyPatent;

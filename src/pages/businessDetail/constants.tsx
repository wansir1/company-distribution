import type { ColumnsType } from 'antd/es/table';
import { CompanyType } from '@/Map/constants';
import { Space } from 'antd';
import styles from './index.less';
export type RecommendType = {
  serialNumber?: number;
  companyName: string;
  industrialLayout: string[] | string;
};
export const columns: ColumnsType<RecommendType> = [
  {
    title: '序号',
    dataIndex: 'serialNumber',
    key: 'serialNumber',
    align: 'center',
    // render: (record, data, index) => {
    //   return <span>{index + 1}</span>;
    // },
  },
  {
    title: '企业名称',
    dataIndex: 'companyName',
    key: 'companyName',
    align: 'center',
  },
  {
    title: '产业类别',
    dataIndex: 'industrialLayout',
    key: 'industrialLayout',
    align: 'center',
    render: (record: string[], data, index) => {
      return (
        <Space>
          {record.map((item) => {
            return (
              <span
                className={styles.span}
                style={{
                  backgroundColor: 'rgba(26, 144, 255, 0.85)',
                  fontSize: '8px',
                  marginBottom: '0px',
                }}
              >
                {item}
              </span>
            );
          })}
        </Space>
      );
    },
  },
];

import type { ColumnsType } from 'antd/es/table';

export type InvestmentType = {
  serialNumber?: number;
  name: string;
  ratio: number;
  amount: number;
};
//投资列表
export const investmentColumns: ColumnsType<InvestmentType> = [
  {
    title: '序号',
    dataIndex: 'serialNumber',
    key: 'serialNumber',
    align: 'center',
  },
  {
    title: '公司名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: '投资比例',
    dataIndex: 'ratio',
    key: 'ratio',
    align: 'center',
    render: (record, data, index) => {
      return <span>{data.ratio * 100}%</span>;
    },
  },
  {
    title: '投资金额',
    dataIndex: 'amount',
    key: 'amount',
    align: 'center',
    render: (record, data, index) => {
      return <span>{data.amount}万元</span>;
    },
  },
];

import type { ColumnsType } from 'antd/es/table';

const date: Date = new Date();
const year: number = date.getFullYear();

export type PatentNumberType = {
  patentType: string;
  totalPatentRelated: number;
  year: number;
  yearMinusOne: number;
  yearMinusTwo: number;
  yearMinusThree: number;
  yearMinusThreeBefore: number;
};
const renderColor = (text: number) => {
  if (text === 0) {
    return <span style={{ color: 'red' }}>{text}</span>;
  } else {
    return text;
  }
};
//专利有关于年份表的table
export const patentNumberColumns: ColumnsType<PatentNumberType> = [
  {
    title: '专利类型',
    dataIndex: 'patentType',
    key: 'patentType',
    align: 'center',
  },
  {
    title: `${year - 3}之前`,
    dataIndex: 'yearMinusThreeBefore',
    key: 'yearMinusThreeBefore',
    align: 'center',
    render: renderColor,
  },
  {
    title: `${year - 3}`,
    dataIndex: 'yearMinusThree',
    key: 'yearMinusThree',
    align: 'center',
    render: renderColor,
  },
  {
    title: `${year - 2}`,
    dataIndex: 'yearMinusTwo',
    key: 'yearMinusTwo',
    align: 'center',
    render: renderColor,
  },
  {
    title: `${year - 1}`,
    dataIndex: 'yearMinusOne',
    key: 'yearMinusOne',
    align: 'center',
    render: renderColor,
  },
  {
    title: `${year}`,
    dataIndex: 'year',
    key: 'year',
    align: 'center',
    render: renderColor,
  },
  {
    title: '相关专利总数',
    dataIndex: 'totalPatentRelated',
    key: 'totalPatentRelated',
    align: 'center',
    render: renderColor,
  },
];

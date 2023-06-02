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

//专利有关于年份表的table
export const patentNumberColumns: ColumnsType<PatentNumberType> = [
  {
    title: '专利类型',
    dataIndex: 'patentType',
    key: 'patentType',
    align: 'center',
  },
  {
    title: '相关专利总数',
    dataIndex: 'totalPatentRelated',
    key: 'totalPatentRelated',
    align: 'center',
    render: (text: number) => {
      if (text === 0) {
        return <span style={{ color: 'red' }}>{text}</span>;
      } else {
        return text;
      }
    },
  },
  {
    title: `${year}`,
    dataIndex: 'year',
    key: 'year',
    align: 'center',
    render: (text: number) => {
      if (text === 0) {
        return <span style={{ color: 'red' }}>{text}</span>;
      } else {
        return text;
      }
    },
  },
  {
    title: `${year - 1}`,
    dataIndex: 'yearMinusOne',
    key: 'yearMinusOne',
    align: 'center',
    render: (text: number) => {
      if (text === 0) {
        return <span style={{ color: 'red' }}>{text}</span>;
      } else {
        return text;
      }
    },
  },
  {
    title: `${year - 2}`,
    dataIndex: 'yearMinusTwo',
    key: 'yearMinusTwo',
    align: 'center',
    render: (text: number) => {
      if (text === 0) {
        return <span style={{ color: 'red' }}>{text}</span>;
      } else {
        return text;
      }
    },
  },

  {
    title: `${year - 3}`,
    dataIndex: 'yearMinusThree',
    key: 'yearMinusThree',
    align: 'center',
    render: (text: number) => {
      if (text === 0) {
        return <span style={{ color: 'red' }}>{text}</span>;
      } else {
        return text;
      }
    },
  },
  {
    title: `${year - 3}之前`,
    dataIndex: 'yearMinusThreeBefore',
    key: 'yearMinusThreeBefore',
    align: 'center',
    render: (text: number) => {
      if (text === 0) {
        return <span style={{ color: 'red' }}>{text}</span>;
      } else {
        return text;
      }
    },
  },
];
//专利数量表的假数据
export const patentNumber_Data: PatentNumberType[] = [
  {
    patentType: '发明专利',
    totalPatentRelated: 14,
    year: 0,
    yearMinusOne: 5,
    yearMinusTwo: 3,
    yearMinusThree: 2,
    yearMinusThreeBefore: 4,
  },
  {
    patentType: '外观设计',
    totalPatentRelated: 28,
    year: 7,
    yearMinusOne: 0,
    yearMinusTwo: 14,
    yearMinusThree: 0,
    yearMinusThreeBefore: 7,
  },
  {
    patentType: '实用新型',
    totalPatentRelated: 15,
    year: 5,
    yearMinusOne: 4,
    yearMinusTwo: 1,
    yearMinusThree: 4,
    yearMinusThreeBefore: 0,
  },
];

export const lineOption: any = {
  xAxis: {
    type: 'category',
    data: ['2020年之前', '2020年', '2021年', '2022年', '2023年'],
  },
  yAxis: {
    name: '专利数量',
    type: 'value',
  },
  legend: {
    top: '4px',
  },
  series: [
    {
      name: '发明专利',
      data: [2, 3, 5, 7, 6],
      type: 'line',
    },
    {
      name: '外观设计',
      data: [0, 2, 7, 6, 11],
      type: 'line',
    },
    {
      name: '实用新型',
      data: [3, 5, 14, 8, 5],
      type: 'line',
    },
  ],
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
};

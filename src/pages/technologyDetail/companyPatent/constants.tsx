import type { ColumnsType } from 'antd/es/table';
export type PatentNumberType = {
  patentType: string;
  totalPatentRelated: number;
  year2023: number;
  year2022: number;
  year2021: number;
  year2020: number;
  yearBefore2020: number;
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
  },
  {
    title: '2023',
    dataIndex: 'year2023',
    key: 'year2023',
    align: 'center',
  },
  {
    title: '2022',
    dataIndex: 'year2022',
    key: 'year2022',
    align: 'center',
  },
  {
    title: '2021',
    dataIndex: 'year2021',
    key: 'year2021',
    align: 'center',
  },

  {
    title: '2020',
    dataIndex: 'year2020',
    key: 'year2020',
    align: 'center',
  },
  {
    title: '2020年之前',
    dataIndex: 'yearBefore2020',
    key: 'yearBefore2020',
    align: 'center',
  },
];
//专利数量表的假数据
export const patentNumber_Data: PatentNumberType[] = [
  {
    patentType: '发明专利',
    totalPatentRelated: 14,
    year2023: 0,
    year2022: 5,
    year2021: 3,
    year2020: 2,
    yearBefore2020: 4,
  },
  {
    patentType: '外观设计',
    totalPatentRelated: 28,
    year2023: 7,
    year2022: 0,
    year2021: 14,
    year2020: 0,
    yearBefore2020: 7,
  },
  {
    patentType: '实用新型',
    totalPatentRelated: 15,
    year2023: 5,
    year2022: 4,
    year2021: 1,
    year2020: 4,
    yearBefore2020: 0,
  },
];

const lineData: any = [
  {
    year: '2020之前',
    number: 0,
    category: '发明专利',
  },
  {
    year: '2020之前',
    number: 7,
    category: '外观设计',
  },
  {
    year: '2020之前',
    number: 5,
    category: '实用新型',
  },
  {
    year: '2020',
    number: 5,
    category: '发明专利',
  },
  {
    year: '2020',
    number: 0,
    category: '外观设计',
  },
  {
    year: '2020',
    number: 4,
    category: '实用新型',
  },
  {
    year: '2021',
    number: 5,
    category: '发明专利',
  },
  {
    year: '2021',
    number: 14,
    category: '外观设计',
  },
  {
    year: '2021',
    number: 7,
    category: '实用新型',
  },
  {
    year: '2022',
    number: 9,
    category: '发明专利',
  },
  {
    year: '2022',
    number: 8,
    category: '外观设计',
  },
  {
    year: '2022',
    number: 12,
    category: '实用新型',
  },
  {
    year: '2023',
    number: 4,
    category: '发明专利',
  },
  {
    year: '2023',
    number: 13,
    category: '外观设计',
  },
  {
    year: '2023',
    number: 9,
    category: '实用新型',
  },
];
export const lineConfig: any = {
  data: lineData,
  xField: 'year',
  yField: 'number',
  seriesField: 'category',
  autoFit: false,
  width: 720,
  height: 300,
  // padding:[24,24,24,100],
  label: {},
  point: {
    size: 5,
    shape: 'round',
    style: {
      fill: 'white',
      stroke: '#5B8FF9',
      lineWidth: 2,
    },
  },
  tooltip: {
    showMarkers: false,
  },
  yAxis: {
    title: { text: '专利数量', position: 'end', autoRotate: false, offset: 50 },
  },
  xAxis: {
    title: { text: '年份', position: 'end', offset: 14 },
  },
  state: {
    active: {
      style: {
        shadowBlur: 4,
        stroke: '#000',
        fill: 'red',
      },
    },
  },
  interactions: [
    {
      type: 'marker-active',
    },
  ],
};

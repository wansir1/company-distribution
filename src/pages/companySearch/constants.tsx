import type { ColumnsType } from 'antd/es/table';
import { CompanyType } from '@/Map/constants';
import {
  BarChart,
  BarSeriesOption,
  LineSeriesOption,
  PieSeriesOption,
} from 'echarts/charts';
import * as echarts from 'echarts';
import {
  TooltipComponentOption,
  ToolboxComponentOption,
  GridComponentOption,
} from 'echarts/components';

export const columns: ColumnsType<CompanyType> = [
  {
    title: '企业名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: '所在省',
    dataIndex: 'provinceName',
    key: 'provinceName',
    align: 'center',
  },
  {
    title: '城市',
    dataIndex: 'cityName',
    key: 'cityName',
    align: 'center',
  },
  {
    title: '区县',
    dataIndex: 'districtName',
    key: 'districtName',
    align: 'center',
  },
  {
    title: '注册资本(万)',
    dataIndex: 'registeredCapital',
    key: 'registeredCapital',
    align: 'center',
    render: (record, data) => {
      return <span>{record ? record : '--'}</span>;
    },
  },
];

type EChartsOption = echarts.ComposeOption<
  | TooltipComponentOption
  | GridComponentOption
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | ToolboxComponentOption
>;

export const getFirstOption = (
  financingEchart: FinancingEchart[],
): EChartsOption => {
  const data = financingEchart?.map((item) => {
    return { value: Number(item.value), name: item.date };
  });
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}万 ({d}%)',
    },
    title: {
      subtext: '相关企业融资金额',
      // left: 'center',
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: '相关企业融资金额（千万元）',
        type: 'pie',
        radius: [20, 140],
        center: ['50%', '50%'],
        roseType: 'area',
        label: {
          show: true,
          overflow: 'break',
        },
        itemStyle: {
          borderRadius: 5,
        },
        data: data || [],
      },
    ],
  };
};

export const getThirdOption = (patentEchart: PatentEchart): EChartsOption => {
  return {
    axisLabel: {
      color: 'rgba(0,0,0,0.65)',
    },
    color: ['#facc14', '#223273'],
    dataZoom: {
      handleIcon:
        'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      handleStyle: {
        color: '#FFFFFF',
        borderColor: '#D9D9D9',
        borderWidth: 1,
        shadowBlur: 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOffsetX: 0,
        shadowOffsetY: 1,
      },
      left: 60,
      right: 60,
      textStyle: {
        color: 'rgba(0,0,0,0.65)',
      },
      type: 'slider',
    },
    grid: {
      containLabel: true,
      left: 20,
      right: 20,
      bottom: 20,
    },
    legend: {
      left: 'right',
      itemGap: 16,
      itemHeight: 12,
      itemWidth: 12,
      show: true,
      textStyle: {
        color: 'rgba(0,0,0,0.65)',
        fontSize: 14,
      },
    },
    title: {
      left: 'left',
      textStyle: {
        color: 'rgba(0,0,0,0.85)',
        fontSize: 14,
        fontWeight: 500,
      },
      top: 'top',
    },
    tooltip: {
      axisPointer: {
        type: 'shadow',
      },
      trigger: 'axis',
      show: true,
    },
    xAxis: {
      axisLabel: {
        rotate: 45,
        color: 'black',
      },
      triggerEvent: true,
      axisLine: {
        lineStyle: {
          color: '#E9E9E9',
        },
      },
      axisTick: {
        alignWithLabel: true,
      },
      nameGap: 12,
      splitLine: {
        show: false,
      },
      type: 'category',
      data: patentEchart?.dataX || [],
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: '#E9E9E9',
          type: 'dotted',
        },
      },
      nameTextStyle: {
        align: 'left',
      },
      name: '相关企业专利数',
      type: 'value',
    },
    series: [
      {
        barCategoryGap: '50%',
        barMaxWidth: 57,
        data: patentEchart?.dataY?.accumulation || [],
        name: '累计专利数',
        type: 'bar',
      },
      {
        barCategoryGap: '50%',
        barMaxWidth: 57,
        data: patentEchart?.dataY?.newlyIncrease || [],
        name: '新增专利数',
        type: 'bar',
      },
    ],
  };
};

export const secondOption: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: [
        '2021-06',
        '2021-09',
        '2021-12',
        '2022-03',
        '2022-06',
        '2022-09',
        '2022-12',
      ],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      nameTextStyle: {
        align: 'left',
      },
      name: '相关企业笔数',
      type: 'value',
    },
  ],
  series: [
    {
      name: '融资笔数：',
      type: 'line',
      showSymbol: false,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' },
        ]),
      },
      data: [10, 5, 11, 15, 12, 20, 9],
    },
  ],
};

//industryData 接口类型
export interface IndustryData {
  relatedEnterpriseNumber: number;
  relatedPatentsNumber: number;
  listedCompaniesNumber: number;
  financingEchart: FinancingEchart[];
  patentEchart: PatentEchart;
}

export interface FinancingEchart {
  value: string;
  date: string;
}

export interface DataY {
  newlyIncrease: number[];
  accumulation: number[];
}

export interface PatentEchart {
  dataX: string[];
  dataY: DataY;
}

// 获取三个指标
export const getIndex = (
  relatedEnterpriseNumber: number,
  relatedPatentsNumber: number,
  listedCompaniesNumber: number,
) => {
  console.log(
    relatedEnterpriseNumber,
    relatedPatentsNumber,
    listedCompaniesNumber,
    listedCompaniesNumber === 0 ? 0 : listedCompaniesNumber || '--',
  );
  return [
    {
      label: '相关企业数',
      value:
        relatedEnterpriseNumber === 0 ? 0 : relatedEnterpriseNumber || '--',
      valueStyle: { color: '#13c2c2' },
      unit: '家',
    },
    {
      label: '相关企业专利数量',
      value: relatedPatentsNumber === 0 ? 0 : relatedPatentsNumber || '--',
      style: { top: '14px' },
      valueStyle: { color: '#3436c7' },
      unit: '个',
    },
    {
      label: '相关企业中上市公司数量',
      valueStyle: { color: 'green' },
      style: { top: '24px' },
      value: listedCompaniesNumber === 0 ? 0 : listedCompaniesNumber || '--',
      unit: '家',
    },
  ];
};

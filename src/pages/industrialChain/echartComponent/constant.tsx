import * as echarts from 'echarts';
import geoJsonData from '@/assets/datavJson/JiangXi.json';
import ReactECharts from 'echarts-for-react';
import { GrowthRateVO, DistributionVO } from '@/services/search';
type EChartsOption = echarts.EChartsOption;

type ChartRefType = ReactECharts;
interface EnterpriseValuesType {
  value: number;
  name: string;
}
interface EnterpriseDataType {
  total: number;
  category: { name: string }[];
  values: EnterpriseValuesType[];
}

const getEnterpriseOption = (
  data: EnterpriseDataType,
  componentNumber: number,
): EChartsOption => {
  let maxValue = data.values.sort(
    (a: EnterpriseValuesType, b: EnterpriseValuesType) => b.value - a.value,
  )[0];
  let text = '北斗企业数量统计分布',
    subtext = `其中${maxValue.name}产业节点企业最多：${maxValue.value}，所有企业数：${data.total}`;
  if (componentNumber !== 1) {
    (text = '近24个月专利数统计'),
      (subtext = `其中${maxValue.name}产业节点专利最多：${maxValue.value}，所有专利数：${data.total}`);
  }

  return {
    title: {
      text: text,
      subtext: subtext,
      top: 'top',
      left: 'left',
      textStyle: {
        fontSize: 18,
      },
      subtextStyle: {
        fontSize: 12,
      },
    },
    tooltip: {
      trigger: 'item',
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        saveAsImage: { show: true },
      },
    },
    legend: [
      {
        icon: 'roundRect',
        orient: 'vertical',
        left: 'left',
        top: 'bottom',
        data: data.category.slice(0, 5).map((item) => item.name),
      },
      {
        icon: 'roundRect',
        orient: 'vertical',
        left: 'right',
        top: 'bottom',
        data: data.category.slice(5).map((item) => item.name),
      },
    ],
    series: [
      {
        name: text,
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '60%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'inner',
          formatter(param) {
            return param.value + '';
          },
        },
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: data.values,
      },
    ],
    animationDelay: function (idx) {
      return idx * 200;
    },
    animationDelayUpdate: function (idx) {
      return idx * 200;
    },
  };
};
// 增长率组件
const getGrowthRateOption = (
  data: GrowthRateVO,
  componentNumber: number,
  growthType: string,
): EChartsOption => {
  let maxValue = { value: -100, index: 0 };
  if (componentNumber == 1) {
    data.categories[0].value.forEach((item, index) => {
      if (item > maxValue.value) {
        maxValue.value = item;
        maxValue.index = index;
      }
    });
  }
  let growthTypeText = growthType == '1' ? '季度' : '月度';
  let text = `北斗企业数量${growthTypeText}增长率（%）`,
    subtext = `其中${
      data.categories[0].category[maxValue.index]
    }产业节点企业${growthTypeText}增长率最快，增长率为：${(
      maxValue.value * 100
    ).toFixed(0)}%`,
    color = '#188df0';
  if (componentNumber === 2) {
    data.categories[1].value.forEach((item, index) => {
      if (item > maxValue.value) {
        maxValue.value = item;
        maxValue.index = index;
      }
    });
    text = `北斗产业专利数${growthTypeText}增长率（%）`;
    subtext = `其中${
      data.categories[1].category[maxValue.index]
    }产业节点专利${growthTypeText}增长率最快，增长率为：${(
      maxValue.value * 100
    ).toFixed(0)}%`;
    color = '#ff3300';
  } else if (componentNumber === 3) {
    data.categories[2].value.forEach((item, index) => {
      if (item > maxValue.value) {
        maxValue.value = item;
        maxValue.index = index;
      }
    });
    text = `北斗产业融资额数${growthTypeText}增长率（%）`;
    subtext = `其中${
      data.categories[1].category[maxValue.index]
    }产业节点融资额${growthTypeText}增长率最快，增长率为：${(
      maxValue.value * 100
    ).toFixed(0)}%`;
    color = '#725e82';
  }
  return {
    title: {
      text: text,
      subtext: subtext,
      textStyle: {
        fontSize: 18,
      },
      subtextStyle: {
        fontSize: 12,
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        saveAsImage: { show: true },
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      height: '70%',
      width: '80%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: 'category',
      axisLabel: { fontSize: 10, interval: 0 },
      data: data.categories[componentNumber - 1].category,
    },
    series: [
      {
        type: 'bar',
        itemStyle: {
          color: color,
        },
        data: data.categories[componentNumber - 1].value.map((item) =>
          Math.floor(item * 100),
        ),
      },
    ],
    animationDelay: function (idx) {
      return idx * 130;
    },
    animationDelayUpdate: function (idx) {
      return idx * 130;
    },
  };
};

// 分布
const geoJson: any = geoJsonData;
const getMapOption = (data: DistributionVO, componentNumber: number) => {
  data.companyData.sort((a, b) => b.value - a.value);
  data.patentData.sort((a, b) => b.value - a.value);
  let text = '北斗企业地理分布',
    subtext = `其中江西省北斗企业最多的两个市级为：\n${
      data.companyData[0].name + '（' + data.companyData[0].value + '）'
    }，${data.companyData[1].name + '（' + data.companyData[1].value + '）'}`,
    color = ['#ffffff', '#e0f3f8', '#abd9e9', '#ffffbf', '#fee090', '#74add1'];

  if (componentNumber !== 1) {
    text = '北斗产业专利申请地理分布';
    subtext = `其中江西省北斗产业专利申请最多的两个市级\n为：${
      data.patentData[0].name + '（' + data.patentData[0].value + '）'
    }，${data.patentData[1].name + '（' + data.patentData[1].value + '）'}`;
    color = [
      '#FFD3C6', // 最浅的朱砂红
      '#FFB5A6',
      '#FF9786',
      '#FF7A66',
      '#FF5C46',
      '#FF3E26', // 最深的朱砂红
    ];
  }

  echarts.registerMap('JiangXi', geoJson);
  return {
    title: {
      text: text,
      subtext: subtext,
      left: 'left',
      textStyle: {
        fontSize: 18,
      },
      subtextStyle: {
        fontSize: 12,
      },
    },
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0.2,
    },
    backgroundColor: 'transparent', // echarts 背景色
    visualMap: {
      type: 'piecewise',
      splitNumber: 6,
      left: 'left',
      top: 'bottom',
      min:
        componentNumber == 1
          ? data.companyData[data.companyData.length - 1].value
          : data.patentData[data.patentData.length - 1].value,
      max:
        componentNumber == 1
          ? data.companyData[0].value
          : data.patentData[0].value,
      itemWidth: 15,
      itemHeight: 9,
      backgroundColor: '#dcdcdc',
      inRange: {
        color: color,
      },
      textStyle: {
        fontSize: 12,
      },
      // text: ['High', 'Low'],
      formatter: function (value: any, value2: any) {
        return Math.ceil(value) + '-' + Math.ceil(value2);
      },
    },
    toolbox: {
      show: true,
      left: 'right',
      top: 'top',
      feature: {
        saveAsImage: {},
      },
    },
    series: [
      {
        name: '江西省',
        type: 'map',
        map: 'JiangXi',
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
          },
          itemStyle: {
            areaColor: 'yellow',
            borderColor: '#94c5ea',
            fontColor: '#fff',
          },
        },
        center: [114.97, 27.31],
        zoom: 1.25, //图层
        itemStyle: {
          normal: {
            borderColor: '#94c5ea',
            areaColor: '#ffffff',
            shadowColor: 'rgb(58,115,192)',
            shadowOffsetX: 1.8,
            shadowOffsetY: 1.7,
          },
        },
        data: data[componentNumber == 1 ? 'companyData' : 'patentData'],
      },
    ],
  };
};

export {
  EnterpriseDataType,
  EnterpriseValuesType,
  getEnterpriseOption,
  getGrowthRateOption,
  getMapOption,
  ChartRefType,
};

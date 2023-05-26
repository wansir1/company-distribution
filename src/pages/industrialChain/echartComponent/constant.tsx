import * as echarts from 'echarts';
import * as turf from '@turf/turf';
import geoJsonData from '@/assets/datavJson/JiangXi.json';
import jiangXi from '@/assets/datavJson/JiangXi_exclusive.json';
type EChartsOption = echarts.EChartsOption;

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
        name: '企业数量统计分布',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '60%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'inner',
          formatter(param) {
            console.log(param, 'jj');
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
  };
};
// 增长率组件
const getGrowthRateOption = (
  data: any,
  componentNumber: number,
): EChartsOption => {
  let text = '北斗企业数量季度增长率（%）',
    subtext = '其中基础产品产业节点企业季度增长率最快，增长率为：0.5%',
    color = '#188df0';
  if (componentNumber === 2) {
    text = '北斗产业专利数季度增长率（%）';
    subtext = '其中基础产品产业节点专利季度增长率最快，增长率为：0.5%';
    color = '#ff3300';
  } else if (componentNumber === 3) {
    text = '北斗产业融资额数季度增长率（%）';
    subtext = '其中基础产品产业节点融资额季度增长率最快，增长率为：0.5%';
    color = '#725e82';
  }
  return {
    title: {
      text: text,
      subtext: subtext,
      textStyle: {
        // fontSize: 15,
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
      data: [
        'Brazil',
        'Indonesia',
        'USA',
        'India',
        'China',
        'World',
        'Brazil',
        'Indonesia',
        'USA',
        'India',
        'China',
        'World',
      ],
    },
    series: [
      {
        type: 'bar',
        itemStyle: {
          color: color,
        },
        data: [0.3, 0.12, 0.2, 0.4, 0.4, 0.3, 0.25, 0.38, 0.5, 0.4, 0.14, 0.33],
      },
    ],
  };
};

// 分布
const geoJson: any = geoJsonData;
const getMapOption = (data: any, componentNumber: number) => {
  let text = '北斗企业地理分布',
    subtext = `其中江西省北斗企业最多的两个市级为：\n南昌市（30），赣州市（23）`,
    color = ['#ffffff', '#e0f3f8', '#abd9e9', '#ffffbf', '#fee090', '#74add1'];

  if (componentNumber !== 1) {
    text = '北斗产业专利申请地理分布';
    subtext = `其中江西省北斗产业专利申请最多的两个市级\n为：南昌市（30），赣州市（23）`;
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
      min: 0,
      max: 30,
      itemWidth: 15,
      itemHeight: 9,
      backgroundColor: '#dcdcdc',
      inRange: {
        color: color,
      },
      // text: ['High', 'Low'],
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
        data: [
          { name: '南昌市', value: 30 },
          { name: '景德镇市', value: 10 },
          { name: '萍乡市', value: 1 },
          { name: '九江市', value: 5 },
          { name: '新余市', value: 12 },
          { name: '鹰潭市', value: 8 },
          { name: '赣州市', value: 23 },
          { name: '吉安市', value: 10 },
          { name: '宜春市', value: 17 },
          { name: '抚州市', value: 11 },
          { name: '上饶市', value: 15 },
        ],
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
};

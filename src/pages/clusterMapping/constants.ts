export interface GraphNode {
  symbolSize: number;
  label?: {
    show?: boolean;
  };
}
export interface DataType {
  id: number;
  name: string;
  category: number;
  value?: number | string;
  symbolSize?: number;
  label?: {
    show?: boolean;
  };
}

export interface LinkType {
  source: number;
  target: number;
  value: string;
}
export interface GraphType {
  category: { name: string }[];
  data: DataType[];
  links: LinkType[];
}

export const getSymbolValue = (valueArr: number[]): number[] => {
  // 数值能够更好地体现出转换前数值之间的大小差异，线性缩放方法：
  // 1找到原始数据中的最小值（min）和最大值（max）。
  // 2将每个数值减去最小值，得到差值（diff）。
  // 3计算缩放因子（scale factor）：scale = (desiredMax - desiredMin) / (max - min)，其中desiredMax是期望的最大值，desiredMin是期望的最小值。
  // 4将每个差值乘以缩放因子，然后加上desiredMin，得到转换后的数值。
  const MIN_SCALE = 0.005;
  const desiredMax = 100;
  const desiredMin = 5;
  const min = Math.min.apply(null, valueArr);
  const max = Math.max.apply(null, valueArr);
  const scale = (desiredMax - desiredMin) / (max - min);
  const nonLinearScale = (value: number) => {
    const exponent = 1.08;
    const scaledValue = Math.pow(value - min, exponent) * scale + desiredMin;
    return scaledValue > 100 ? 100 : Math.round(scaledValue);
  };
  console.log('scale', scale, min, max);
  const result =
    scale < MIN_SCALE
      ? valueArr.map((item) => {
          return nonLinearScale(item);
        })
      : valueArr.map((item) => {
          const diff = item - min;
          const scaledNum = diff * scale + desiredMin;
          return Math.round(scaledNum);
        });
  return result;
};

export const getOption = (graphData: GraphType | undefined) => {
  const option = {
    title: {
      text: '北斗产业集群图谱',
      //  subtext: 'Default layout',
      top: 'top',
      left: 'left',
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    legend: {
      x: 'center',
      show: true,
      data: graphData ? graphData.category.map((item) => item.name) : [],
    },
    series: [
      {
        type: 'graph',
        name: '北斗产业',
        layout: 'force',
        top: '30px',
        symbolSize: 10,
        cursor: 'pointer',
        edgeLabel: {
          show: false,
          textStyle: {
            fontSize: 10,
          },
          formatter: '{c}',
        },
        force: {
          repulsion: 2500,
          edgeLength: [10, 100],
          layoutAnimation: true,
          friction: 0.1,
          //         edgeLength: 5,
          //         repulsion: 200,
          // gravity: 0.2
        },
        legendHoverLink: false,
        emphasis: {
          disabled: false,
          scale: true,
          lineStyle: {
            width: 10,
          },
          focus: 'adjacency',
          blurScope: 'global',
        },
        draggable: false,
        roam: true,
        categories: graphData ? graphData.category : [],
        label: {
          position: 'right',
          show: true,
          textStyle: {
            fontSize: 12,
          },
        },
        tooltip: {
          formatter: function (node: any) {
            // 区分连线和节点，节点上额外显示其他数字
            // console.log(node);
            if (typeof node.value == 'number') {
              return node.data.name + ':' + node.value;
            } else {
              return (
                graphData?.data[node.data.source].name +
                '-' +
                graphData?.data[node.data.target].name +
                ':' +
                node.value
              );
            }
          },
        },
        lineStyle: {
          color: 'source',
          opacity: 0.5,
          width: 1,
          curveness: 0.3,
        },
        // progressiveThreshold: 700,
        nodes: graphData?.data,
        links: graphData?.links,
      },
    ],
  };
  return option;
};

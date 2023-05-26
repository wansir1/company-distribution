import TagCloud from 'TagCloud';
import { GraphType } from '@/pages/clusterMapping/constants';
export interface GraphNode {
  symbolSize: number;
  label?: {
    show?: boolean;
  };
}
export interface globalThis {
  Event: {
    target: {
      className: string;
    };
  };
}

export const handleTagCloud = (prop: any) => {
  const { setSelectValue, getRelationData, data } = prop;
  const container = '.tagCloud';
  const texts = data
    .sort((a, b) => b.registeredCapital - a.registeredCapital)
    .map((item: any) => item.name)
    .slice(0, 25);
  const options = { radius: 200 };
  TagCloud(container, texts, options);
  let tagCloud = document.querySelector(container);
  tagCloud?.addEventListener('click', function clickEventHandler(e) {
    if (
      e.target instanceof HTMLElement &&
      e.target.className === 'tagcloud--item'
    ) {
      setSelectValue(e.target.innerText);
      getRelationData(e.target.innerText);
    }
    // 在这里使用了一个类型保护，断言的方式可能导致运行时错误
  });
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
      top: '30rem',
      data: graphData ? graphData.category.map((item) => item.name) : [],
    },
    series: [
      {
        type: 'graph',
        name: '北斗产业',
        layout: 'force',
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
          friction: 0.1,
          //         edgeLength: 5,
          //         repulsion: 200,
          // gravity: 0.3
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
        zoom: 0.7,
        center: [450, 270],
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

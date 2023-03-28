import React from 'react';
import Chart from '@/components/Echart';
import styles from './index.less';
import { graph,GraphNode } from './constants'
const ClusterMapping: React.FC = (props) => {

     graph.nodes.forEach(function (node: GraphNode) {
       node.label = {
         show: node.symbolSize > 30,
       };
     });
     const option = {
       title: {
         text: '北斗产业集群图谱',
        //  subtext: 'Default layout',
         top: 'top',
         left: 'left',
       },
       tooltip: {},
       legend: [
         {
           // selectedMode: 'single',
           data: graph.categories.map(function (a: { name: string }) {
             return a.name;
           }),
         },
       ],
       animationDuration: 1500,
       animationEasingUpdate: 'quinticInOut',
       series: [
         {
           name: '北斗产业',
           type: 'graph',
           layout: 'none',
           data: graph.nodes,
           links: graph.links,
           categories: graph.categories,
           roam: true,
           label: {
             position: 'right',
             formatter: '{b}',
           },
           lineStyle: {
             color: 'source',
             curveness: 0.3,
           },
           emphasis: {
             focus: 'adjacency',
             lineStyle: {
               width: 10,
             },
           },
         },
       ],
     };
    return (
        <div className={styles.wrapper}>
            <Chart option={option} style={{width: '100%', height:'100%'}}/>
        </div>
    )
}

export default ClusterMapping;
import React from 'react';
import { G2 } from '@ant-design/charts';

const pieData: any = [
  {
    type: '0项',
    value: 30,
    flag: 0,
  },
  {
    type: '1项',
    value: 4,
    flag: 0,
  },
  {
    type: '2-3项',
    value: 7,
    flag: 1,
  },
  {
    type: '3项以上',
    value: 5,
    flag: 0,
  },
];

const G = G2.getEngine('canvas');
export const pieConfig: any = {
  autoFit: false,
  width: 654,
  appendPadding: 10,
  data: pieData,
  angleField: 'value',
  colorField: 'type',
  radius: 1,
  innerRadius: 0.75,
  label: {
    type: 'spider',
    style: {
      textAlign: 'center',
      fontSize: 12,
    },
    formatter: (data: any, mappingData: any) => {
      const group = new G.Group({});
      if (data.flag == 0) {
        group.addShape({
          type: 'text',
          attrs: {
            x: 0,
            y: 0,
            text: `${data.type}`,
            fill: mappingData.color,
          },
        });
      } else {
        group.addShape({
          type: 'text',
          attrs: {
            x: 0,
            y: 0,
            text: `${data.type}(当前企业位置)`,
            fill: mappingData.color,
          },
        });
      }
      return group;
    },
  },
  legend: {
    offsetX: -45,
  },
  interactions: [
    {
      type: 'element-selected',
    },
    {
      type: 'element-active',
    },
  ],
  statistic: {
    title: false,
    content: {
      content: '',
    },
  },
};

import React from 'react';
import { G2 } from '@ant-design/charts';

const pieData: any = [
  {
    type: 0,
    value: 16,
    flag: 0,
  },
  {
    type: 1,
    value: 14,
    flag: 0,
  },
  {
    type: 2,
    value: 9,
    flag: 0,
  },
  {
    type: 3,
    value: 8,
    flag: 1,
  },
];
for (let i = 0; i < pieData.length; i++) {
  if (pieData[i].type == 0) pieData[i].type = '0项';
  else if (pieData[i].type == 1) pieData[i].type = '1-10项';
  else if (pieData[i].type == 2) pieData[i].type = '11-50项';
  else pieData[i].type = '50项以上';
}

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

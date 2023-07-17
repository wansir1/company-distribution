import React from 'react';
import Title from '@/components/Title';

import { Liquid } from '@ant-design/plots';
import { Pie } from '@ant-design/plots';
import { ResultCompanyTrademarks } from '@/pages/technologyDetail/constans';
import { G2 } from '@ant-design/charts';

type PropsType = {
  resultCompanyTrademarks: ResultCompanyTrademarks;
};

const Trademark: React.FC<PropsType> = (props) => {
  const { resultCompanyTrademarks } = props;
  let newPercent: string = (
    resultCompanyTrademarks?.trademarkRatio * 100
  ).toFixed(2);
  newPercent = isNaN(Number(newPercent)) ? ' -- ' : newPercent;

  const liquidConfig: any = {
    width: 160,
    height: 160,
    autoFit: false,
    percent: resultCompanyTrademarks?.trademarkRatio,
    outline: {
      border: 2,
      distance: 4,
    },
    statistic: {
      title: {
        offsetY: 25,
        customHtml: () => {
          return (
            <span style={{ fontSize: '16px', fontWeight: 'lighter' }}>
              超过<span style={{ color: 'FF4500' }}> {newPercent}%</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;的同行
            </span>
          );
        },
      },
      content: {
        customHtml: () => {
          return '';
        },
      },
    },
    wave: {
      length: 128,
    },
    radius: 1,
  };
  const typeMap: any = {
    0: '0项',
    1: '1-10项',
    2: '11-50项',
    3: '50项以上',
  };
  let convertedPieData: any = resultCompanyTrademarks?.trademarkMapList.map(
    ({ type, value, flag }) => {
      return {
        type: typeMap[type] ?? '--',
        value,
        flag,
      };
    },
  );
  const G = G2.getEngine('canvas');
  const pieConfig: any = {
    autoFit: false,
    width: 654,
    appendPadding: 10,
    data: convertedPieData || [],
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
  return (
    <div>
      <Title text="知识产权实力" style={{ fontSize: '16px' }} />
      <div
        style={{
          width: '654',
          height: '245',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Pie {...pieConfig} />
        <div style={{ position: 'absolute', left: '210px' }}>
          <Liquid {...liquidConfig} />
        </div>
      </div>
      <span style={{ marginLeft: 10 }}>
        拥有商标数量情况：该企业拥有商标&nbsp;
        <span style={{ color: '#FFA500' }}>
          {resultCompanyTrademarks?.trademarkItems}
        </span>
        &nbsp;项，超过&nbsp;
        <span style={{ color: '#FFA500' }}>{newPercent}%</span>
        &nbsp;的同行。
      </span>
    </div>
  );
};

export default Trademark;

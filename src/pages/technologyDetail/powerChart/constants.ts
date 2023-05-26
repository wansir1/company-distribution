const radarData: any = [
  {
    name: '技术领域投资热度指数',
    score: 66,
  },
  {
    name: '资本集中度指数',
    score: 78,
  },
  {
    name: '专利集中度指数',
    score: 89,
  },
  {
    name: '资源平均增速指数',
    score: 27,
  },
  {
    name: '人员规模指数',
    score: 82,
  },
  {
    name: '资本实力指数',
    score: 61,
  },
  {
    name: '技术实力指数',
    score: 78,
  },
];
export const radarConfig: any = {
  data: radarData.map((d: any) => ({ ...d, score: d.score })),
  xField: 'name',
  yField: 'score',
  autoFit: false,
  width: 624,
  height: 300,
  meta: {
    score: {
      alias: '分数',
      min: 0,
      max: 100,
    },
  },
  xAxis: {
    line: null,
    tickLine: null,
    grid: {
      line: {
        style: {
          lineDash: null,
        },
      },
    },
  },
  yAxis: {
    line: null,
    tickLine: null,
    grid: {
      line: {
        type: 'line',
        style: {
          lineDash: null,
        },
      },
      alternateColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
  // radius:0.6,
  point: {
    size: 2,
  },
};

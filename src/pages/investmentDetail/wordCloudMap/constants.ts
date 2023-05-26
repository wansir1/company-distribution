const wordCloudData: any = [
  {
    value: 9,
    name: '配电柜',
  },
  {
    value: 8,
    name: '变电站',
  },
  {
    value: 8,
    name: '建筑材料',
  },
  {
    value: 8,
    name: '建筑',
  },
  {
    value: 8,
    name: '电力系统',
  },
  {
    value: 8,
    name: '工程机械',
  },
  {
    value: 6,
    name: '变压器',
  },
  {
    value: 6,
    name: '配电箱',
  },
  {
    value: 6,
    name: '充电桩',
  },
  {
    value: 6,
    name: '电力电压',
  },
  {
    value: 6,
    name: '电气设备',
  },
  {
    value: 6,
    name: '光伏发电',
  },
  {
    value: 6,
    name: '烘干设备',
  },
  {
    value: 6,
    name: '太阳能',
  },
  {
    value: 6,
    name: '门窗',
  },
  {
    value: 6,
    name: '互联网',
  },
  {
    value: 6,
    name: '散热',
  },
  {
    value: 6,
    name: '梯子',
  },
  {
    value: 6,
    name: '电源',
  },
  {
    value: 6,
    name: '开关柜',
  },
  {
    value: 6,
    name: '降频',
  },
  {
    value: 6,
    name: '电动汽车',
  },
  {
    value: 4,
    name: '灯具',
  },
  {
    value: 4,
    name: '电容器',
  },
  {
    value: 4,
    name: '太阳能热水器',
  },
  {
    value: 4,
    name: '电力系统继电保护',
  },
  {
    value: 4,
    name: '检测设备',
  },
  {
    value: 4,
    name: '断路器',
  },
  {
    value: 4,
    name: '接线盒',
  },
  {
    value: 4,
    name: '涂装设备',
  },
  {
    value: 4,
    name: '技术表面处理',
  },
  {
    value: 4,
    name: '数据处理',
  },
  {
    value: 4,
    name: '防雷',
  },
  {
    value: 4,
    name: '监控设备',
  },
  {
    value: 4,
    name: '地球物理勘测',
  },
  {
    value: 4,
    name: '监控设备',
  },
  {
    value: 4,
    name: '无线充电',
  },
  {
    value: 4,
    name: '新能源汽车',
  },
  {
    value: 4,
    name: '箱包',
  },
  {
    value: 3,
    name: '电动汽车充电',
  },
  {
    value: 3,
    name: '窗户',
  },
  {
    value: 3,
    name: '门窗',
  },
  {
    value: 3,
    name: '电力检测',
  },

  {
    value: 3,
    name: '涂层',
  },
  {
    value: 3,
    name: '芯片',
  },
  {
    value: 3,
    name: '天线',
  },
  {
    value: 3,
    name: '模块',
  },
  {
    value: 3,
    name: '板卡',
  },
  {
    value: 3,
    name: '基础产品',
  },
  {
    value: 3,
    name: '终端产品',
  },
  {
    value: 3,
    name: '运维服务',
  },
  {
    value: 3,
    name: '卫星设计',
  },
  {
    value: 3,
    name: '卫星制造',
  },
  {
    value: 3,
    name: '卫星发射',
  },
  {
    value: 3,
    name: '主控站',
  },
  {
    value: 3,
    name: '注入站',
  },
  {
    value: 3,
    name: '监测站',
  },
];
export const wordCloudConfig: any = {
  data: wordCloudData,
  padding: [20, 100, 100, 100],
  wordField: 'name',
  weightField: 'value',
  colorField: 'name',
  wordStyle: {
    fontFamily: 'Verdana',
    fontSize: [8, 32],
    rotation: 0,
  },
  // 返回值设置成一个 [0, 1) 区间内的值，
  // 可以让每次渲染的位置相同（前提是每次的宽高一致）。
  random: () => 0.5,
};

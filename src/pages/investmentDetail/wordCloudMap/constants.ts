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
const testData = [
  {
    name: '机械设备租赁',
    value: 2,
  },
  {
    name: '信息安全设备销售',
    value: 1,
  },
  {
    name: '仪器仪表修理',
    value: 1,
  },
  {
    name: '工程管理服务',
    value: 1,
  },
  {
    name: '计算机及通讯设备租赁',
    value: 1,
  },
  {
    name: '软件信息咨询服务',
    value: 1,
  },
  {
    name: '交通设施安全监测',
    value: 1,
  },
  {
    name: '电子元器件零售',
    value: 1,
  },
  {
    name: '信息技术咨询服务',
    value: 2,
  },
  {
    name: '监测设备',
    value: 1,
  },
  {
    name: '集成电路销售',
    value: 1,
  },
  {
    name: '电子元器件',
    value: 3,
  },
  {
    name: '技术推广',
    value: 2,
  },
  {
    name: '科技中介服务',
    value: 1,
  },
  {
    name: '技术开发',
    value: 2,
  },
  {
    name: '集成电路制造',
    value: 1,
  },
  {
    name: '工程勘察与设计',
    value: 1,
  },
  {
    name: '物联网',
    value: 1,
  },
  {
    name: '家用电器研发',
    value: 1,
  },
  {
    name: '集成电路设计',
    value: 1,
  },
  {
    name: '软件开发',
    value: 2,
  },
  {
    name: '科学技术开发',
    value: 2,
  },
  {
    name: '云计算服务',
    value: 1,
  },
  {
    name: '建筑材料销售',
    value: 1,
  },
  {
    name: '科技推广和应用服务',
    value: 1,
  },
  {
    name: '智慧交通软硬件开发',
    value: 1,
  },
  {
    name: '物联网技术服务',
    value: 1,
  },
  {
    name: '家用电器零配件销售',
    value: 1,
  },
  {
    name: '专用设备修理',
    value: 1,
  },
  {
    name: '集成电路芯片及产品制造',
    value: 1,
  },
  {
    name: '企业管理咨询',
    value: 1,
  },
  {
    name: '计算机系统集成',
    value: 2,
  },
  {
    name: '计算机及办公设备维修',
    value: 1,
  },
  {
    name: '电子元器件批发',
    value: 1,
  },
  {
    name: '计算机软硬件及外围设备制造',
    value: 1,
  },
  {
    name: '安全监测咨询服务',
    value: 1,
  },
  {
    name: '机械设备',
    value: 1,
  },
  {
    name: '软件销售',
    value: 1,
  },
  {
    name: '信息安全设备制造',
    value: 1,
  },
  {
    name: '通信设备制造',
    value: 1,
  },
  {
    name: '通用设备制造',
    value: 1,
  },
  {
    name: '计算机系统服务',
    value: 1,
  },
  {
    name: '家用电器销售',
    value: 1,
  },
  {
    name: '轻质建筑材料销售',
    value: 1,
  },
  {
    name: '数据服务平台建设',
    value: 1,
  },
  {
    name: '专用设备制造',
    value: 1,
  },
  {
    name: '特种设备销售',
    value: 1,
  },
  {
    name: '集成电路芯片及产品销售',
    value: 1,
  },
  {
    name: '信息系统集成服务',
    value: 3,
  },
  {
    name: '技术推广服务',
    value: 1,
  },
  {
    name: '建筑工程质量检测',
    value: 1,
  },
  {
    name: '计算机软硬件',
    value: 1,
  },
  {
    name: '技术交流',
    value: 2,
  },
  {
    name: '物联网设备销售',
    value: 1,
  },
  {
    name: '安全分析评估',
    value: 1,
  },
  {
    name: '智能仪器仪表',
    value: 2,
  },
  {
    name: '软件外包服务',
    value: 1,
  },
  {
    name: '仪器仪表制造',
    value: 1,
  },
  {
    name: '集成电路芯片设计及服务',
    value: 1,
  },
  {
    name: '家用电器制造',
    value: 1,
  },
  {
    name: '技术服务',
    value: 2,
  },
  {
    name: '技术转让',
    value: 2,
  },
  {
    name: '新材料技术研发',
    value: 1,
  },
  {
    name: '仓储物流',
    value: 1,
  },
  {
    name: '技术咨询',
    value: 2,
  },
];
export const wordCloudConfig: any = {
  data: testData,
  padding: [0, 0, 10, 0],
  height: 320,
  wordField: 'name',
  weightField: 'value',
  colorField: 'name',
  wordStyle: {
    fontFamily: 'Verdana',
    fontSize: [10, 32],
    rotation: 0,
  },
  // 返回值设置成一个 [0, 1) 区间内的值，
  // 可以让每次渲染的位置相同（前提是每次的宽高一致）。
  random: () => 0.5,
};

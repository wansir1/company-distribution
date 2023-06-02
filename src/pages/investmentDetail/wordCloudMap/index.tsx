import React from 'react';
import Title from '@/components/Title';
import { WordCloud } from '@ant-design/plots';
import { wordCloudConfig } from '@/pages/investmentDetail/wordCloudMap/constants';
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
    name: '通用设备修理',
    value: 1,
  },
  {
    name: '工程勘察设计',
    value: 1,
  },
  {
    name: '机械设备销售',
    value: 1,
  },
  {
    name: '建设工程项目管理',
    value: 1,
  },
  {
    name: '物联网设备制造',
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
const WordCloudMap: React.FC = () => {
  return (
    <div>
      <Title
        text="投资企业技术业务云"
        style={{ marginBottom: '3px', fontSize: '16px' }}
      />
      <div>
        <WordCloud {...wordCloudConfig} />
      </div>
    </div>
  );
};

export default WordCloudMap;

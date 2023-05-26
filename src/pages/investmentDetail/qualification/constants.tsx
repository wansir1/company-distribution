import type { ColumnsType } from 'antd/es/table';

//软件著作权表格
type CopyrightType = {
  serialNumber?: number;
  copyrightName: string;
  registerDate: string;
  version: string;
  certificateNumber: string;
};
export const copyrightColumns: ColumnsType<CopyrightType> = [
  {
    title: '序号',
    dataIndex: 'serialNumber',
    key: 'serialNumber',
    align: 'center',
    render: (record, data, index) => {
      return <span>{index + 1}</span>;
    },
  },
  {
    title: '软著名称',
    dataIndex: 'copyrightName',
    key: 'copyrightName',
    align: 'center',
  },
  {
    title: '登记日期',
    dataIndex: 'registerDate',
    key: 'registerDate',
    align: 'center',
  },
  {
    title: '版本号',
    dataIndex: 'version',
    key: 'version',
    align: 'center',
  },
  {
    title: '证书编号',
    dataIndex: 'certificateNumber',
    key: 'certificateNumber',
    align: 'center',
  },
];
export const copyright_Data: CopyrightType[] = [
  {
    copyrightName: '短波综合业务网二期控制器前面板软件',
    registerDate: '2023-01-20',
    version: 'V1.0.0.1',
    certificateNumber: '2023SR0127575',
  },
  {
    copyrightName: '短波125W电台训练模拟器综合业务软件',
    registerDate: '2023-01-20',
    version: 'V1.0',
    certificateNumber: '2023SR0127232',
  },
  {
    copyrightName: '短波400W电台训练模拟器综合业务软件',
    registerDate: '2023-01-20',
    version: 'V1.0',
    certificateNumber: '2023SR0127236',
  },
  {
    copyrightName: '舰载雷达干扰源取证系统上位机软件',
    registerDate: '2023-01-20',
    version: 'V1.0.0.0',
    certificateNumber: '2023SR0127235',
  },
  {
    copyrightName: '舰载雷达干扰源取证设备DSP软件',
    registerDate: '2023-01-20',
    version: 'V1.0',
    certificateNumber: '2023SR0127233',
  },
  {
    copyrightName: '短波双频段电台适配器综合业务软件',
    registerDate: '2023-01-20',
    version: 'V1.0',
    certificateNumber: '2023SR0127234',
  },

  {
    copyrightName: '5kW短波发射机前面板软件',
    registerDate: '2023-01-20',
    version: 'V1.0.0.1',
    certificateNumber: '2023SR0127576',
  },
  {
    copyrightName: '20W短波电台前面板软件',
    registerDate: '2023-01-20',
    version: 'V1.0.0.1',
    certificateNumber: '2023SR0127577',
  },
  {
    copyrightName: '短波20W/125W电台训练模拟器综合业务软件',
    registerDate: '2022-09-29',
    version: 'V1.0',
    certificateNumber: '2022SR1383821',
  },
  {
    copyrightName: '机载频谱监测测向设备FPGA软件',
    registerDate: '2022-09-29',
    version: 'V1.0',
    certificateNumber: '2022SR1383822',
  },
  {
    copyrightName: '浮标接收机DSP软件',
    registerDate: '2022-09-29',
    version: 'V1.0',
    certificateNumber: '2022SR1383794',
  },
];
//企业资质列表
type QualificationType = {
  serialNumber?: number;
  qualificationName: string;
  qualificationType: string;
  //许可证号|登记编号
  licenseNumber: string;
  startDate: string;
  endDate: string;
};
export const qualificationColumns: ColumnsType<QualificationType> = [
  {
    title: '序号',
    dataIndex: 'serialNumber',
    key: 'serialNumber',
    align: 'center',
    render: (record, data, index) => {
      return <span>{index + 1}</span>;
    },
  },
  {
    title: '资质名称',
    dataIndex: 'qualificationName',
    key: 'qualificationName',
    align: 'center',
  },
  {
    title: '资质类型',
    dataIndex: 'qualificationType',
    key: 'qualificationType',
    align: 'center',
  },
  {
    title: '许可证号',
    dataIndex: 'licenseNumber',
    key: 'licenseNumber',
    align: 'center',
  },
  {
    title: '发证日期',
    dataIndex: 'startDate',
    key: 'startDate',
    align: 'center',
  },
  {
    title: '截止日期',
    dataIndex: 'endDate',
    key: 'endDate',
    align: 'center',
  },
];
export const qualification_Data: QualificationType[] = [
  {
    qualificationName: '触摸电视一体机',
    qualificationType: 'CCC强制性产品',
    licenseNumber: '2012010808525407',
    startDate: '2011-03-22',
    endDate: '2014-12-07',
  },
  {
    qualificationName: '触摸电视',
    qualificationType: 'CCC强制性产品',
    licenseNumber: '2011010808465097',
    startDate: '2011/3/22',
    endDate: '2014-10-09',
  },
  {
    qualificationName: '触摸电视',
    qualificationType: '节能产品认证（不含建筑节能）',
    licenseNumber: 'CQC11701061366',
    startDate: '2011-08-12',
    endDate: '2011-12-31',
  },
  {
    qualificationName: '触摸电视一体机（55”）',
    qualificationType: '节能产品认证（不含建筑节能）',
    licenseNumber: 'CQC12701068136',
    startDate: '2013-01-07',
    endDate: '2014-11-28',
  },
  {
    qualificationName: '同方电子科技有限公司',
    qualificationType: '信息系统工程监理资质单位证书',
    licenseNumber: 'Z4360020130482',
    startDate: '2013-05-20',
    endDate: '-',
  },
  {
    qualificationName: '触摸电视一体机(65',
    qualificationType: '节能产品认证（不含建筑节能）',
    licenseNumber: 'CQC13701095628',
    startDate: '2013-11-29',
    endDate: '2016-05-17',
  },
  {
    qualificationName: '交互智能一体机（触摸电视）/多媒体互动教学一体机',
    qualificationType: 'CCC强制性产品',
    licenseNumber: '2013010808622442',
    startDate: '2013-12-11',
    endDate: '2018-03-20',
  },
  {
    qualificationName: '交互智能一体机（触摸电视）/多媒体互动教学一体机',
    qualificationType: 'CCC强制性产品',
    licenseNumber: '2013010808622443',
    startDate: '2013/12/11',
    endDate: '2018-03-20',
  },
  {
    qualificationName: '激光投影机',
    qualificationType: 'CCC强制性产品',
    licenseNumber: '2019010903207493',
    startDate: '2019-07-17',
    endDate: '2023-10-17',
  },
];
// {
//   qualificationName: "资质名称",
//     qualificationType: "资质类型",
//   //许可证号|登记编号
//   licenseNumber: "",
//   startDate: "发证日期",
//   endDate: "截止日期",
// },

import type { ColumnsType } from 'antd/es/table';

//软件著作权表格类型
export type CopyrightType = {
  serialNumber?: number;
  name: string;
  registrationTime: string;
  versionNumber: string;
  registrationNumber: string;
};
//企业资质列表数据类型
export type QualificationType = {
  serialNumber?: number;
  name: string;
  type: string;
  //许可证号|登记编号
  number: string;
  issuingTime: string;
  closingTime: string;
};
//软件著作权表格列属性设置
export const copyrightColumns: ColumnsType<CopyrightType> = [
  {
    title: '序号',
    dataIndex: 'serialNumber',
    key: 'serialNumber',
    align: 'center',
  },
  {
    title: '软著名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: '登记日期',
    dataIndex: 'registrationTime',
    key: 'registrationTime',
    align: 'center',
  },
  {
    title: '版本号',
    dataIndex: 'versionNumber',
    key: 'versionNumber',
    align: 'center',
  },
  {
    title: '证书编号',
    dataIndex: 'registrationNumber',
    key: 'registrationNumber',
    align: 'center',
  },
];

//企业资质表格列属性设置
export const qualificationColumns: ColumnsType<QualificationType> = [
  {
    title: '序号',
    dataIndex: 'serialNumber',
    key: 'serialNumber',
    align: 'center',
    width: '8%',
  },
  {
    title: '资质证书名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    width: '36%',
  },
  {
    title: '资质类型',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    width: '12%',
  },
  {
    title: '许可证号',
    dataIndex: 'number',
    key: 'number',
    align: 'center',
    width: '20%',
  },
  {
    title: '发证日期',
    dataIndex: 'issuingTime',
    key: 'issuingTime',
    align: 'center',
    width: '12%',
    render: (record, data, index) => {
      if (data.issuingTime != '1990-01-01') {
        return <span>{data.issuingTime}</span>;
      }
      return <span>--</span>;
    },
  },
  {
    title: '截止日期',
    dataIndex: 'closingTime',
    key: 'closingTime',
    align: 'center',
    width: '12%',
    render: (record, data, index) => {
      if (data.closingTime != '1990-01-01') {
        return <span>{data.closingTime}</span>;
      }
      return <span>--</span>;
    },
  },
];

import type { ColumnsType } from 'antd/es/table';
export type BusinessInfoType = {
  companyName: string;
  registeredCapital: string;
  address: string;
  legalPerson: string;
  registeredTime: string;
  contactInfo: string;
  registrationStatus: string;
};
type keyType = keyof BusinessInfoType;
export const businessInfoList: { value: string; key: keyType }[] = [
  { value: '公司中文名称', key: 'companyName' },
  { value: '注册资本', key: 'registeredCapital' },
  { value: '注册地址', key: 'address' },
  { value: '法人代表', key: 'legalPerson' },
  { value: '注册时间', key: 'registeredTime' },
  { value: '联系方式', key: 'contactInfo' },
  { value: '登记状态', key: 'registrationStatus' },
];

export type ReleaseType = {
  board: string;
  stockCode: string;
  stockName: string;
  releaseDate: string;
};
export const columns: ColumnsType<ReleaseType> = [
  {
    title: '板块',
    dataIndex: 'board',
    key: 'board',
    align: 'center',
  },
  {
    title: '证券代码',
    dataIndex: 'stockCode',
    key: 'stockCode',
    align: 'center',
  },
  {
    title: '证券简称',
    dataIndex: 'stockName',
    key: 'stockName',
    align: 'center',
  },
  {
    title: '上市日期',
    dataIndex: 'releaseDate',
    key: 'releaseDate',
    align: 'center',
  },
];

export type TechnologyType = {
  name: string;
  licenseNumber: string;
  identificationDate: string;
  agency: string;
};

export const technologyColumns: ColumnsType<TechnologyType> = [
  {
    title: '公司名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: '许可证号',
    dataIndex: 'licenseNumber',
    key: 'licenseNumber',
    align: 'center',
  },
  {
    title: '认定年份',
    dataIndex: 'identificationDate',
    key: 'identificationDate',
    align: 'center',
  },
  {
    title: '认定机构',
    dataIndex: 'agency',
    key: 'agency',
    align: 'center',
  },
];

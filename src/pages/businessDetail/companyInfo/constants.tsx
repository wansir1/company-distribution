import type { ColumnsType } from 'antd/es/table';
import Title from '@/components/Title';
import { Table } from 'antd';
type keyType = keyof CompanyBusinessIndustryInfo;
export const businessInfoList: {
  value: string;
  key: keyType;
  unit?: string;
}[] = [
  { value: '公司中文名称', key: 'name' },
  { value: '注册资本', key: 'registeredCapital', unit: '万' },
  { value: '注册地址', key: 'registeredAddress' },
  { value: '法人代表', key: 'legalRepresentative' },
  { value: '注册时间', key: 'registeredTime' },
  { value: '联系方式', key: 'phone' },
  { value: '登记状态', key: 'registerStatus' },
];

export type ReleaseType = {
  plate: string;
  securitiesCode: string;
  securitiesAbbreviation: string;
  goPublicDate: string;
};
export const columns: ColumnsType<ReleaseType> = [
  {
    title: '板块',
    dataIndex: 'plate',
    key: 'plate',
    align: 'center',
  },
  {
    title: '证券代码',
    dataIndex: 'securitiesCode',
    key: 'securitiesCode',
    align: 'center',
  },
  {
    title: '证券简称',
    dataIndex: 'securitiesAbbreviation',
    key: 'securitiesAbbreviation',
    align: 'center',
  },
  {
    title: '上市日期',
    dataIndex: 'goPublicDate',
    key: 'goPublicDate',
    align: 'center',
  },
];
export type TechnologyType = {
  name: string;
  license: string;
  accreditationDate: string;
  accreditationAgency: string;
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
    dataIndex: 'license',
    key: 'license',
    align: 'center',
  },
  {
    title: '认定年份',
    dataIndex: 'accreditationDate',
    key: 'accreditationDate',
    align: 'center',
  },
  {
    title: '认定机构',
    dataIndex: 'accreditationAgency',
    key: 'accreditationAgency',
    align: 'center',
  },
];

// table

export const getTable = <T extends object, U extends T>(
  tableNum: number,
  dataSource: U,
  columns: ColumnsType<T>,
) => {
  const text = tableNum === 1 ? '上市公司信息' : '高新技术企业';
  return (
    <div>
      <Title
        text={text}
        style={{ marginBottom: '3px', marginTop: '30px', fontSize: '16px' }}
      />
      <Table
        className="businessTable"
        columns={columns}
        dataSource={[dataSource]}
        bordered
        pagination={false}
        size="small"
      />
    </div>
  );
};

// Info组件接口返回类型
export interface ResType {
  companyBusinessLayoutInfo: CompanyBusinessLayoutInfo;
  companyBusinessIndustryInfo: CompanyBusinessIndustryInfo;
  resultGoPublicVO: ResultGoPublicVO;
  resultHighTechVO: ResultHighTechVO;
}

export interface ResultGoPublicVO {
  goPublicId: number;
  plate: string;
  securitiesCode: string;
  securitiesAbbreviation: string;
  goPublicDate: string;
  companyId: number;
}

export interface ResultIndustryTypeVOList {
  industryTypeId: string;
  name: string;
  type: number;
  companyId: number;
}

export interface CompanyBusinessLayoutInfo {
  registeredAddress: string;
  website: string;
  resultGoPublicVO: ResultGoPublicVO;
  isHighTech: boolean;
  resultIndustryTypeVOList: ResultIndustryTypeVOList[];
}

export interface CompanyBusinessIndustryInfo {
  companyId: number;
  name: string;
  registeredAddress: string;
  registeredCapital: number;
  legalRepresentative: string;
  phone: string;
  registeredTime: string;
  registerStatus: string;
}

export interface ResultGoPublicVO {
  goPublicId: number;
  plate: string;
  securitiesCode: string;
  securitiesAbbreviation: string;
  goPublicDate: string;
  companyId: number;
}

export interface ResultHighTechVO {
  highTechId: number;
  license: string;
  accreditationDate: string;
  accreditationAgency: string;
  companyId: number;
}

export interface ColumnHighTechVO {
  highTechId: number;
  license: string;
  accreditationDate: string;
  accreditationAgency: string;
  companyId: number;
  name: string;
}

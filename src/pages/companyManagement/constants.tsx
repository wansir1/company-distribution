import type { ProColumns } from '@ant-design/pro-components';
export type ColumnType = {
  companyId?: string;
  name: string;
  creditCode?: string;
  phone?: string;
  postCode?: string;
  email?: string;
  legalRepresentative?: string;
  validTime?: string;
  industryTypeId?: string;
  industryTypeName?: string[];
  registeredCapital?: number;
  registeredTime?: string;
  registeredAddress?: string;
  registerStatus?: string;
  website?: string;
  provinceId?: number;
  cityId?: string;
  cityName: string;
  districtId?: number;
  districtName?: string;
  address?: string;
  longitude?: number;
  latitude?: number;
};
type Record = {
  companyId?: string;
  name: string;
  creditCode?: string;
  phone?: string;
  postCode?: string;
  email?: string;
  legalRepresentative?: string;
  validTime?: string;
  industryTypeId?: string;
  industryTypeName?: string[];
  registeredCapital?: number;
  registeredTime?: string;
  registeredAddress?: string;
  registerStatus?: string;
  website?: string;
  provinceId?: number;
  cityId?: number;
  cityName: string;
  districtId?: number;
  districtName?: string;
  address?: string;
  longitude?: number;
  latitude?: number;
};
export type SearchCompanyType = {
  records: Record[];
  total: number;
  size: number;
  current: number;
  orders?: any[];
  searchCount: boolean;
  pages: number;
};
export const dataTest = [
  {
    companyId: '1',
    name: '拿到手弗兰克',
  },
];

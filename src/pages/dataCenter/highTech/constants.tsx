//列表属性类型
export type ColumnType = {
  highTechId?: string;
  license: string;
  accreditationAgency: string;
  accreditationDate: string;
  companyId?: string;
};
export type SearchHighTechType = {
  records: Records[];
  total: number;
  size: number;
  current: number;
  orders?: any[];
  searchCount: boolean;
  pages: number;
};

export type Records = {
  highTechId?: string;
  license: string;
  accreditationAgency: string;
  accreditationDate: string;
  companyId?: string;
};
//测试数据
export const dataTest = [
  {
    highTechId: 2222,
    license: 'stri1122212',
    accreditationAgency: '水水水水水水',
    accreditationDate: '2000-1-1',
    companyId: 2222,
  },
];

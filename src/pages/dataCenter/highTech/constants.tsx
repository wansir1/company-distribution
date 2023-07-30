//列表属性类型
export type ColumnType = {
  highTechId?: number;
  license: string;
  accreditationAgency: string;
  accreditationDate: string;
  companyId?: number;
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
  {
    highTechId: 22222,
    license: 'stri112222212',
    accreditationAgency: '水22水水水水水',
    accreditationDate: '2000-1-7',
    companyId: 222332,
  },
];

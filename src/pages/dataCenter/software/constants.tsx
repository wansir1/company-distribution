//列表属性类型
export type ColumnType = {
  softwareWritingId?: string;
  name: string;
  registrationNumber: string;
  versionNumber: string;
  registrationTime: string;
  companyId?: string;
};
export type SearchSoftwareWritingType = {
  records: Records[];
  total: number;
  size: number;
  current: number;
  orders?: any[];
  searchCount: boolean;
  pages: number;
};

export type Records = {
  softwareWritingId?: string;
  name: string;
  registrationNumber: string;
  versionNumber: string;
  registrationTime: string;
  companyId?: string;
};
//测试数据
export const dataTest = [
  {
    softwareWritingId: 2222,
    name: '测试股1221',
    registrationNumber: '测试股1221',
    versionNumber: '测试股1221',
    registrationTime: '2000-1-1',
    companyId: 2222,
  },
];
//将字符串转换成字符串数组
export function convertToArray(str: string): string[] {
  return str.includes(',') ? str.split(',') : [str];
}

//公司列表属性类型
export type ColumnType = {
  industryTypeId?: string;
  name: string;
  type: number;
  companyId?: string;
};
export type SearchIndustryLayoutType = {
  records: Records[];
  total: number;
  size: number;
  current: number;
  orders?: any[];
  searchCount: boolean;
  pages: number;
};

export type Records = {
  industryTypeId?: string;
  name: string;
  type: number;
  companyId?: string;
};
//测试数据
export const dataTest = [
  {
    industryTypeId: 1121333,
    name: '软件服务',
    type: 2,
    companyId: 123123213,
  },
];
//将字符串转换成字符串数组
export function convertToArray(str: string): string[] {
  return str.includes(',') ? str.split(',') : [str];
}

//公司列表属性类型

export type ColumnType = {
  typeId?: string;
  name: string;
};
//测试数据
export const dataTest = [
  {
    typeId: '222',
    name: 'string',
  },
];
export type SearchTypeOfIndustryType = {
  records: Records[];
  total: number;
  size: number;
  current: number;
  orders?: any[];
  searchCount: boolean;
  pages: number;
};

export type Records = {
  typeId?: string;
  name: string;
};
//将字符串转换成字符串数组
export function convertToArray(str: string): string[] {
  return str.includes(',') ? str.split(',') : [str];
}

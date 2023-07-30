//公司列表属性类型
export type ColumnType = {
  industryTypeId?: number;
  name: string;
  type: number;
  companyId?: number;
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

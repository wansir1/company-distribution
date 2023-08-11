//公司列表属性类型
export type ColumnType = {
  financeId?: number;
  date: string;
  amount: number;
  companyId?: number;
};
//测试数据
export const dataTest = [
  {
    financeId: 2222,
    date: '2011-6-6',
    amount: 1300,
    companyId: 2222,
  },
];
//将字符串转换成字符串数组
export function convertToArray(str: string): string[] {
  return str.includes(',') ? str.split(',') : [str];
}

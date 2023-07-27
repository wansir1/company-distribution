export type ColumnType = {
  companyInvestmentId?: number;
  name: string;
  ratio: number;
  amount: number;
  companyId?: number;
  business: string[];
};
export const dataTest = [
  {
    companyInvestmentId: 1,
    name: '对外公司名称',
    ratio: 1,
    amount: 1000,
    companyId: 1,
    business: ['科技', '种田', '西瓜', '科技', '种田', '西瓜'],
  },
];

export function convertToArray(str: string): string[] {
  return str.includes(',') ? str.split(',') : [str];
}

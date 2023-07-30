//公司列表属性类型
export type ColumnType = {
  qualificationCertificateId?: number;
  name: string;
  type: string;
  number: string;
  // issuingAuthority:string;
  // state:string;
  issuingTime: string;
  closingTime: string;
  companyId?: number;
};
//测试数据
export const dataTest = [
  {
    qualificationCertificateId: 2221,
    name: 'asas啊',
    type: 'asa22s啊',
    number: 'asa3s啊',
    issuingTime: '2000-1-1',
    closingTime: '2000-1-1',
    companyId: 22221,
  },
];
//将字符串转换成字符串数组
export function convertToArray(str: string): string[] {
  return str.includes(',') ? str.split(',') : [str];
}

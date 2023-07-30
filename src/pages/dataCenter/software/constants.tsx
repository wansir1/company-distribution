//列表属性类型
export type ColumnType = {
  softwareWritingId?: number;
  name: string;
  //abbreviation:string;
  registrationNumber: string;
  versionNumber: string;
  // takePowerWay:string;
  // finishTime:string;
  // firstPublicTime:string;
  registrationTime: string;
  companyId?: number;
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

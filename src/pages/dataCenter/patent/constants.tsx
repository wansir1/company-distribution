//列表属性类型
export type ColumnType = {
  patentId?: string;
  name: string;
  type: string;
  state: string;
  inventor: string;
  applicant: string;
  applicationNumber: string;
  applicationTime: string;
  publicNumber: string;
  publicTime: string;
  companyId?: string;
};
export type SearchPatentType = {
  records: Records[];
  total: number;
  size: number;
  current: number;
  orders?: any[];
  searchCount: boolean;
  pages: number;
};

export type Records = {
  patentId?: string;
  name: string;
  type: string;
  state: string;
  inventor: string;
  applicant: string;
  applicationNumber: string;
  applicationTime: string;
  publicNumber: string;
  publicTime: string;
  companyId?: string;
};
//测试数据
export const dataTest = [
  {
    patentId: 2222,
    name: '测试时测试',
    type: '测试时测试',
    state: '测试',
    inventor: '我',
    applicant: '自行车',
    applicationNumber: 'asdasd111',
    applicationTime: '2000-1-1',
    publicNumber: 'asdasd111',
    publicTime: '2000-1-1',
    companyId: 2222,
  },
];
//将字符串转换成字符串数组
export function convertToArray(str: string): string[] {
  return str.includes(',') ? str.split(',') : [str];
}

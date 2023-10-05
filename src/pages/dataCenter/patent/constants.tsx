//列表属性类型
import { ApiFunctions } from '@/pages/dataCenter/constants';
import {
  requestDeletePatent,
  requestPatent,
  requestUpdatePatent,
} from '@/services/admin';
import {
  requestDeletePatentSuper,
  requestPatentSuper,
  requestUpdatePatentSuper,
} from '@/services/superAdmin';

export type ColumnType = {
  patentId?: string;
  companyName?: string;
  startTime?: string;
  endTime?: string;
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
  companyName?: string;
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
export const getPatent: ApiFunctions = {
  2: requestPatent,
  3: requestPatentSuper,
};

export const updatePatent: ApiFunctions = {
  2: requestUpdatePatent,
  3: requestUpdatePatentSuper,
};

export const deletePatent: ApiFunctions = {
  2: requestDeletePatent,
  3: requestDeletePatentSuper,
};

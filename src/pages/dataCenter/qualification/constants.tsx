//公司列表属性类型
import { number } from 'echarts';
import { ApiFunctions } from '@/pages/dataCenter/constants';
import {
  requestDeleteQualification,
  requestQualification,
  requestUpdateQualification,
} from '@/services/admin';
import {
  requestDeleteQualificationSuper,
  requestQualificationSuper,
  requestUpdateQualificationSuper,
} from '@/services/superAdmin';

export type ColumnType = {
  qualificationCertificateId?: string;
  companyName?: string;
  startTime?: string;
  endTime?: string;
  name: string;
  type: string;
  number: string;
  issuingTime: string;
  closingTime: string;
  companyId?: string;
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

export type SearchQualificationType = {
  records: Records[];
  total: number;
  size: number;
  current: number;
  orders?: any[];
  searchCount: boolean;
  pages: number;
};

export type Records = {
  qualificationCertificateId?: string;
  companyName?: string;

  name: string;
  type: string;
  number: string;
  issuingTime: string;
  closingTime: string;
  companyId?: string;
};

//将字符串转换成字符串数组
export function convertToArray(str: string): string[] {
  return str.includes(',') ? str.split(',') : [str];
}
export const getQualification: ApiFunctions = {
  2: requestQualification,
  3: requestQualificationSuper,
};

export const updateQualification: ApiFunctions = {
  2: requestUpdateQualification,
  3: requestUpdateQualificationSuper,
};

export const deleteQualification: ApiFunctions = {
  2: requestDeleteQualification,
  3: requestDeleteQualificationSuper,
};

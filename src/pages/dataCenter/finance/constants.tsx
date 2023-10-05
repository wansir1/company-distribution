//公司列表属性类型
import { number } from 'echarts';
import { ApiFunctions } from '@/pages/dataCenter/constants';
import {
  requestDeleteFinance,
  requestFinance,
  requestUpdateFinance,
} from '@/services/admin';
import {
  requestDeleteFinanceSuper,
  requestFinanceSuper,
  requestUpdateFinanceSuper,
} from '@/services/superAdmin';

export type ColumnType = {
  financeId?: string;
  companyName?: string;
  startTime?: string;
  endTime?: string;
  date: string;
  amount: number;
  companyId?: string;
};
export type SearchFinanceType = {
  records: Records[];
  total: number;
  size: number;
  current: number;
  orders?: any[];
  searchCount: boolean;
  pages: number;
};

export type Records = {
  financeId?: string;
  companyName?: string;
  date: string;
  amount: number;
  companyId?: string;
};

//测试数据
export const dataTest = [
  {
    financeId: '2222',
    date: '2011-6-6',
    amount: 1300,
    companyId: '2222',
  },
];
//将字符串转换成字符串数组
export function convertToArray(str: string): string[] {
  return str.includes(',') ? str.split(',') : [str];
}
export const getFinance: ApiFunctions = {
  2: requestFinance,
  3: requestFinanceSuper,
};

export const updateFinance: ApiFunctions = {
  2: requestUpdateFinance,
  3: requestUpdateFinanceSuper,
};

export const deleteFinance: ApiFunctions = {
  2: requestDeleteFinance,
  3: requestDeleteFinanceSuper,
};

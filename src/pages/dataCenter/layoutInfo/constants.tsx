import { ApiFunctions } from '../constants';
import {
  requestDeleteIndustryLayout,
  requestIndustryLayout,
  requestUpdateIndustryLayout,
} from '@/services/admin';
import {
  requestDeleteIndustryLayoutSuper,
  requestIndustryLayoutSuper,
  requestUpdateIndustryLayoutSuper,
} from '@/services/superAdmin';

//公司列表属性类型
export type ColumnType = {
  industryTypeId?: string;
  companyName?: string;
  name: string;
  type: number;
  companyId?: string;
};
export type SearchIndustryLayoutType = {
  records: Records[];
  total: number;
  size: number;
  current: number;
  orders?: any[];
  searchCount: boolean;
  pages: number;
};

export type Records = {
  industryTypeId?: string;
  companyName?: string;
  name: string;
  type: number;
  companyId?: string;
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
export const industryTypeColor = (industry: number) => {
  if (industry === 0) {
    return { industry: '业务', color: 'yellow' };
  } else if (industry === 1) {
    return { industry: '技术', color: 'green' };
  } else {
    return { industry: '产业布局', color: 'blue' };
  }
};
export const getIndustryTypeLayout: ApiFunctions = {
  2: requestIndustryLayout,
  3: requestIndustryLayoutSuper,
};

export const updateIndustryTypeLayout: ApiFunctions = {
  2: requestUpdateIndustryLayout,
  3: requestUpdateIndustryLayoutSuper,
};

export const deleteIndustryTypeLayout: ApiFunctions = {
  2: requestDeleteIndustryLayout,
  3: requestDeleteIndustryLayoutSuper,
};

//列表属性类型
import {
  requestDeleteHighTech,
  requestHighTech,
  requestUpdateHighTech,
} from '@/services/admin';
import {
  requestDeleteHighTechSuper,
  requestHighTechSuper,
  requestUpdateHighTechSuper,
} from '@/services/superAdmin';
import { ApiFunctions } from '@/pages/dataCenter/constants';

export type ColumnType = {
  highTechId?: string;
  companyName?: string;
  startTime?: string;
  endTime?: string;
  license: string;
  accreditationAgency: string;
  accreditationDate: string;
  companyId?: string;
};
export type SearchHighTechType = {
  records: Records[];
  total: number;
  size: number;
  current: number;
  orders?: any[];
  searchCount: boolean;
  pages: number;
};

export type Records = {
  highTechId?: string;
  companyName?: string;
  license: string;
  accreditationAgency: string;
  accreditationDate: string;
  companyId?: string;
};
//测试数据
export const dataTest = [
  {
    highTechId: 2222,
    license: 'stri1122212',
    accreditationAgency: '水水水水水水',
    accreditationDate: '2000-1-1',
    companyId: 2222,
  },
];
export const getHighTech: ApiFunctions = {
  2: requestHighTech,
  3: requestHighTechSuper,
};

export const updateHighTech: ApiFunctions = {
  2: requestUpdateHighTech,
  3: requestUpdateHighTechSuper,
};

export const deleteHighTech: ApiFunctions = {
  2: requestDeleteHighTech,
  3: requestDeleteHighTechSuper,
};

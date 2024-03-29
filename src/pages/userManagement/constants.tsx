import { ApiFunctions } from '@/pages/dataCenter/constants';
import {
  requestDeleteUser,
  requestUpdateUser,
  requestUser,
} from '@/services/admin';
import {
  requestDeleteUserSuper,
  requestUpdateUserSuper,
  requestUserSuper,
} from '@/services/superAdmin';

export type ColumnType = {
  userId?: string;
  companyId: string;
  companyName: string;
  name: string;
  sex: number;
  phone: string;
  state: string;
  role?: number;
};
export type SearchUserType = {
  records: Records[];
  total: number;
  size: number;
  current: number;
  orders?: any[];
  searchCount: boolean;
  pages: number;
};

export type Records = {
  userId?: string;
  companyId: string;
  companyName: string;
  name: string;
  sex: number;
  phone: string;
  state: number;
  role?: number;
};

export const dataTest = [
  {
    userId: '1',
    companyId: '1',
    companyName: '拿到手弗兰克',
    name: '京东方看',
    sex: 0,
    phone: '18779373851',
    state: '2',
    role: 1,
  },
  {
    userId: '2',
    companyId: '2',
    companyName: '拿到手弗兰克',
    name: '京东方看',
    sex: 0,
    phone: '18779373852',
    state: '1',
    role: 1,
  },
];

export const roleColor = (role: number) => {
  if (role === 1) {
    return { role: '普通用户', color: 'lime' };
  } else if (role === 2) {
    return { role: '普通管理员', color: 'purple' };
  } else {
    return { role: '超级管理员', color: 'red' };
  }
};

export const getUser: ApiFunctions = {
  2: requestUser,
  3: requestUserSuper,
};

export const updateUser: ApiFunctions = {
  2: requestUpdateUser,
  3: requestUpdateUserSuper,
};

export const deleteUser: ApiFunctions = {
  2: requestDeleteUser,
  3: requestDeleteUserSuper,
};

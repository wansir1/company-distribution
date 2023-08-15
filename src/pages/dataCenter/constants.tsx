import { requestRegCompany, RegCompanyType } from '@/services/search';

export const getCompanyList = async () => {
  try {
    const data: RegCompanyType[] = await requestRegCompany();
    if (Array.isArray(data)) {
      return data;
    }
  } catch (e) {
    console.log(e);
  }
  return [];
};

// 用于定义对象类型
export type ApiFunctions = {
  [key: number]: (param: any) => Promise<any>;
};

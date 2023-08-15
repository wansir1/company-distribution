import { requestUtils } from '../utils/request';

// 获取行业类别
export type IndustryType = {
  typeId: string;
  name: string;
};
export function requestIndustryType() {
  return requestUtils.get(`/admin/getTypeList`);
}

// 管理员对外投资
type SearchInvestmentParam = {
  companyId: string;
  current: number;
  size: number;
};

export type SearchInvestmentType = {
  records: Records[];
  total: number;
  size: number;
  current: number;
  orders?: any[];
  searchCount: boolean;
  pages: number;
};

export type Records = {
  companyInvestmentId: string;
  name: string;
  ratio: number;
  amount: number;
  companyId: string;
  companyName: string;
  business: string[];
};
export function requestInvestment(param: SearchInvestmentParam) {
  return requestUtils.post(`/admin/searchInvestment/${param.companyId}`, {
    data: { current: param.current, size: param.size },
  });
}
//  对外投资修改和增加
type UpdateInvestmentType = {
  companyInvestmentId?: string;
  name: string;
  ratio: number;
  amount: number;
  companyId?: string;
  business: string[];
};
export function requestUpdateInvestment(
  param: UpdateInvestmentType & { indexNum?: number },
) {
  return requestUtils.post(`/admin/saveOrUpdateInvestment`, {
    data: param,
  });
}
//  对外投资删除
export function requestDeleteInvestment(param: string) {
  return requestUtils.post(`/admin/deleteInvestment/${param}`);
}

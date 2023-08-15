import { requestUtils } from '../utils/request';

// 对外投资
type SearchInvestmentParam = {
  companyId?: string;
  current: number;
  size: number;
  name?: string;
};
export function requestInvestmentSuper(param: SearchInvestmentParam) {
  return requestUtils.post(`/superAdmin/searchInvestment`, {
    data: param,
  });
}
type UpdateInvestmentType = {
  companyInvestmentId?: string;
  name: string;
  ratio: number;
  amount: number;
  companyId?: string;
  companyName?: string;
  business: string[];
};
export function requestUpdateInvestmentSuper(
  param: UpdateInvestmentType & { indexNum?: number },
) {
  return requestUtils.post(`/superAdmin/updateInvestment`, {
    data: param,
  });
}

export function requestDeleteInvestmentSuper(param: string) {
  return requestUtils.post(`/superAdmin/deleteInvestment/${param}`);
}

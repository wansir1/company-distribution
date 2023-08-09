import { number } from 'echarts';
import { requestUtils } from '../utils/request';

//省
export type ProvinceData = {
  provinceId: string;
  provinceName: string;
};
export function requestProvince() {
  return requestUtils.get(`/user/getAllProvince`);
}
// 市
export type CityData = {
  provinceId: string;
  cityName: string;
  cityId: string;
};
export function requestCity(param: string) {
  return requestUtils.get(`/user/getCitysByProvinceId/${param}`);
}

// 区
export type DistrictsData = {
  districtId: string;
  districtName: string;
  postCode: string;
  cityId: string;
};
export function requestDistricts(param: string) {
  return requestUtils.get(`/user/getDistrictsByCityId/${param}`);
}
interface paramsType {
  provinceId?: string;
  cityId?: string;
  typeIdList?: string[];
}
export function requestCompany(param: paramsType) {
  return requestUtils.post(`/user/searchCompany`, {
    data: param,
  });
}

export function requestIndustryType() {
  return requestUtils.get(`/user/getTypeList`);
}

export function requestAllRelationships() {
  return requestUtils.get(`/graph/getAllCompanyRelationships`);
}

export function requestSearchRelation(param: string) {
  return requestUtils.get(`/graph/getCompanyRelationshipsByName?name=${param}`);
}

// 业务详情

export function requestCompanyBusiness(param: { companyId: string }) {
  return requestUtils.post(`/user/searchCompanyBusiness`, {
    data: param,
  });
}

// 技术详情

export function requestCompanyTechnology(param: { companyId: string }) {
  return requestUtils.post(`/user/searchCompanyTechnology`, {
    data: param,
  });
}

// 投资详情

export function requestCompanyInvestment(param: { companyId: string }) {
  return requestUtils.post(`/user/searchCompanyOverseas`, {
    data: param,
  });
}

// 产业分析

export function requestIndustryData(param: { companyTypeList: string[] }) {
  return requestUtils.post(`/user/searchCompanyRelations`, {
    data: param,
  });
}

// 登录
export interface LoginParam {
  phone: string;
  password: string;
  role: number;
}
export function requestLogin(param: LoginParam) {
  return requestUtils.post(`/user/login`, {
    data: param,
  });
}

// 注册
export interface RegisterParam {
  companyId: string;
  name: string;
  sex: number;
  phone: string;
  password: string;
  role: number;
}
export function requestRegCompany() {
  return requestUtils.get(`/user/getCompany`);
}

export function requestCheckPhone(param: string) {
  return requestUtils.post(`/user/checkPhone?phone=${param}`);
}
export function requestRegister(param: RegisterParam) {
  return requestUtils.post(`/user/register`, {
    data: param,
  });
}

// 用户中心
export interface PersonParam {
  userId?: string;
  name: string;
  phone: string;
  idCard?: string;
  sex?: number;
  nation?: string;
  nativePlace?: string;
  birthday?: string;
  education?: number;
  position?: string;
  entryTime?: string;
  state?: number;
  companyName?: string;
  role?: number;
  companyId?: string;
}
export function requestUserInfo(param: string) {
  return requestUtils.post(`/user/getUserById/${param}`);
}

// 修改用户中心信息
export function requestUpdateUserInfo(param: PersonParam) {
  return requestUtils.post(`/user/updateUserCenter`, { data: param });
}

// 管理员对外投资
interface SearchInvestmentParam {
  companyId: string;
  current: number;
  size: number;
}

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

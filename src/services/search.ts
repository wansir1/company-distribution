import { number } from 'echarts';
import { requestUtils } from '../utils/request';

interface paramsType {
  provinceId?: string;
  cityId?: string;
  typeIdList?: string[];
}

export function requestCity(param: string) {
  return requestUtils.get(`/user/getCitysByProvinceId/${param}`);
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

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
interface ParamsType {
  provinceId?: string;
  cityId?: string;
  typeIdList?: string[];
}
export function requestCompany(param: ParamsType) {
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

// 产业链分析
export interface PatentStatisticsVO {
  total: number;
  category: string[];
  value: { name: string; value: number }[];
}

export interface Categories {
  category: string[];
  value: number[];
}

export interface GrowthRateVO {
  categories: Categories[];
}

export interface CompanyData {
  name: string;
  value: number;
}

export interface PatentData {
  name: string;
  value: number;
}

export interface DistributionVO {
  companyData: CompanyData[];
  patentData: PatentData[];
}

export interface ChainDataType {
  patentStatisticsVO: PatentStatisticsVO;
  growthRateVO: GrowthRateVO;
  distributionVO: DistributionVO;
}

export function requestIndustryChain(param: {
  year: string;
  month: string;
  type: string;
}) {
  return requestUtils.post(`/user/industryChain`, {
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

export interface RegCompanyType {
  companyId: string;
  name: string;
}
export function requestRegCompany() {
  return requestUtils.get(`/user/getCompany`);
}

export interface CheckParamType {
  phone: string;
  role: number;
  companyId: string;
}
export function requestCheckPhone(params: CheckParamType) {
  return requestUtils.post(`/user/checkPhone`, {
    data: params,
  });
}
export interface RegisterParam {
  companyId: string;
  name: string;
  sex: number;
  phone: string;
  password: string;
  role: number;
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
//企业中心
export interface CompanyParam {
  companyId?: string;
  name: string;
  creditCode?: string;
  phone?: string;
  postCode?: string;
  email?: string;
  legalRepresentative?: string;
  validTime?: string;
  industryTypeId: string;
  registeredCapital?: number;
  registeredTime?: string;
  registeredAddress?: string;
  registerStatus?: string;
  website?: string;
  province_id?: number;
  city_id?: number;
  district_id?: number;
  address?: number;
  longitude?: number;
  latitude?: number;
}
export type SearchCompanyType = {
  records: CompanyParam[];
  total: number;
  size: number;
  current: number;
  orders?: any[];
  searchCount: boolean;
  pages: number;
};
export function requestCompanyInfo(param: string) {
  return requestUtils.post(`/admin/searchCompany/${param}`, {
    data: { current: 1, size: 5 },
  });
}
export function requestUpdateCompanyInfo(param: CompanyParam) {
  return requestUtils.post(`/admin/saveOrUpdateCompany`, { data: param });
}

// 企业资质模块
export type SearchQualificationParam = {
  companyId: string;
  current: number;
  size: number;
};
export function requestQualification(param: SearchQualificationParam) {
  return requestUtils.post(
    `/admin/searchQualificationCertificateByAdmin/${param.companyId}`,
    {
      data: { current: param.current, size: param.size },
    },
  );
}
type UpdateQualificationType = {
  qualificationCertificateId?: string;
  name: string;
  type: string;
  number: string;
  issuingTime: string;
  closingTime: string;
  companyId?: string;
};
export function requestUpdateQualification(
  param: UpdateQualificationType & { indexNum?: number },
) {
  return requestUtils.post(`/admin/UpdateQualificationCertificate`, {
    data: param,
  });
}

export function requestDeleteQualification(param: string) {
  return requestUtils.post(`/admin/deleteQualificationCertificate/${param}`);
}
// 融资信息模块
export type SearchFinanceParam = {
  companyId: string;
  current: number;
  size: number;
};
export function requestFinance(param: SearchFinanceParam) {
  return requestUtils.post(`/admin/searchFinance/${param.companyId}`, {
    data: { current: param.current, size: param.size },
  });
}
type UpdateFinanceType = {
  financeId?: string;
  date: string;
  amount: number;
  companyId?: string;
};
export function requestUpdateFinance(
  param: UpdateFinanceType & { indexNum?: number },
) {
  return requestUtils.post(`/admin/updateFinance`, {
    data: param,
  });
}
export function requestDeleteFinance(param: string) {
  return requestUtils.post(`/admin/deleteFinance/${param}`);
}
//高新科技模块
export type SearchHighTechParam = {
  companyId: string;
  current: number;
  size: number;
};
export function requestHighTech(param: SearchHighTechParam) {
  return requestUtils.post(`/admin/searchHighTech/${param.companyId}`, {
    data: { current: param.current, size: param.size },
  });
}
type UpdateHighTechType = {
  highTechId?: string;
  license: string;
  accreditationAgency: string;
  accreditationDate: string;
  companyId?: string;
};
export function requestUpdateHighTech(
  param: UpdateHighTechType & { indexNum?: number },
) {
  return requestUtils.post(`/admin/UpdateHighTech`, {
    data: param,
  });
}
export function requestDeleteHighTech(param: string) {
  return requestUtils.post(`/admin/deleteHighTech/${param}`);
}
//专利信息管理模块
export type SearchPatentParam = {
  companyId: string;
  current: number;
  size: number;
};
export function requestPatent(param: SearchPatentParam) {
  return requestUtils.post(`/admin/searchPatentByAdmin/${param.companyId}`, {
    data: { current: param.current, size: param.size },
  });
}
type UpdatePatentType = {
  patentId?: string;
  name: string;
  type: string;
  state: string;
  inventor: string;
  applicant: string;
  applicationNumber: string;
  applicationTime: string;
  publicNumber: string;
  publicTime: string;
  companyId?: string;
};
export function requestUpdatePatent(
  param: UpdatePatentType & { indexNum?: number },
) {
  return requestUtils.post(`/admin/UpdatePatent`, {
    data: param,
  });
}
export function requestDeletePatent(param: string) {
  return requestUtils.post(`/admin/deletePatent/${param}`);
}
//软著信息模块
export type SearchSoftwareWritingParam = {
  companyId: string;
  current: number;
  size: number;
};
export function requestSoftwareWriting(param: SearchSoftwareWritingParam) {
  return requestUtils.post(
    `/admin/searchSoftwareWritingByAdmin/${param.companyId}`,
    {
      data: { current: param.current, size: param.size },
    },
  );
}
type UpdateSoftwareWritingType = {
  softwareWritingId?: string;
  name: string;
  registrationNumber: string;
  versionNumber: string;
  registrationTime: string;
  companyId?: string;
};
export function requestUpdateSoftwareWriting(
  param: UpdateSoftwareWritingType & { indexNum?: number },
) {
  return requestUtils.post(`/admin/UpdateSoftwareWriting`, {
    data: param,
  });
}
export function requestDeleteSoftwareWriting(param: string) {
  return requestUtils.post(`/admin/deleteSoftwareWriting/${param}`);
}
//产业布局信息模块
export type SearchIndustryLayoutParam = {
  companyId: string;
  current: number;
  size: number;
};
export function requestIndustryLayout(param: SearchIndustryLayoutParam) {
  return requestUtils.post(
    `/admin/searchIndustryTypeByadmin/${param.companyId}`,
    {
      data: { current: param.current, size: param.size },
    },
  );
}
type UpdateIndustryLayoutType = {
  industryTypeId?: string;
  name: string;
  type: number;
  companyId?: string;
};
export function requestUpdateIndustryLayout(
  param: UpdateIndustryLayoutType & { indexNum?: number },
) {
  return requestUtils.post(`/admin/UpdateIndustryType`, {
    data: param,
  });
}
export function requestDeleteIndustryLayout(param: string) {
  return requestUtils.post(`/admin/deleteIndustryType/${param}`);
}
//用户管理
export type SearchUserParam = {
  companyId: string;
  name: string;
  phone: string;
  state: number | null;
  current: number;
  size: number;
};
export function requestUser(param: SearchUserParam) {
  return requestUtils.post(`/admin/searchUser`, {
    data: param,
  });
}
type UpdateUserType = {
  userId?: string;
  name: string;
  sex: number;
  phone: string;
  state: string;
};
export function requestUpdateUser(
  param: UpdateUserType & { indexNum?: number },
) {
  return requestUtils.post(`/admin/updateUser`, {
    data: param,
  });
}
export function requestDeleteUser(param: string) {
  return requestUtils.post(`/admin/deleteUser/${param}`);
}

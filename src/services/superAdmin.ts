import { requestUtils } from '../utils/request';
import { number } from 'echarts';

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
//超级管理员 产业类型模块
export type SearchTypeOfIndustryParam = {
  name: string;
  current: number;
  size: number;
};
export function requestTypeOfIndustry(param: SearchTypeOfIndustryParam) {
  return requestUtils.post(`/superAdmin/SearchTypeList`, {
    data: param,
  });
}
type UpdateTypeOfIndustryType = {
  typeId?: string;
  name: string;
};
export function requestUpdateTypeOfIndustry(
  param: UpdateTypeOfIndustryType & { indexNum?: number },
) {
  return requestUtils.post(`/superAdmin/saveOrUpdateType`, {
    data: param,
  });
}
export function requestDeleteTypeOfIndustry(param: string) {
  return requestUtils.post(`/superAdmin/deleteType/${param}`);
}
//超级管理员 专利模块
type SearchPatentParam = {
  companyId?: string;
  startTime?: string;
  endTime?: string;
  applicant?: string;
  state?: string;
  current: number;
  size: number;
};
export function requestPatentSuper(param: SearchPatentParam) {
  return requestUtils.post(`/superAdmin/searchPatent`, {
    data: param,
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
export function requestUpdatePatentSuper(
  param: UpdatePatentType & { indexNum?: number },
) {
  return requestUtils.post(`/superAdmin/updatePatent`, {
    data: param,
  });
}

export function requestDeletePatentSuper(param: string) {
  return requestUtils.post(`/superAdmin/deletePatent/${param}`);
}
//超级管理员 融资信息模块
type SearchFinanceParam = {
  companyId?: string;
  startTime?: string;
  endTime?: string;
  current: number;
  size: number;
};
export function requestFinanceSuper(param: SearchFinanceParam) {
  return requestUtils.post(`/superAdmin/searchFinance`, {
    data: param,
  });
}
type UpdateFinanceType = {
  financeId?: string;
  date: string;
  amount: number;
  companyId?: string;
};
export function requestUpdateFinanceSuper(
  param: UpdateFinanceType & { indexNum?: number },
) {
  return requestUtils.post(`/superAdmin/updateFinance`, {
    data: param,
  });
}

export function requestDeleteFinanceSuper(param: string) {
  return requestUtils.post(`/superAdmin/deleteFinance/${param}`);
}
//高新科技模块
type SearchHighTechParam = {
  companyId?: string;
  startTime?: string;
  endTime?: string;
  license?: string;
  accreditationAgency?: string;
  current: number;
  size: number;
};
export function requestHighTechSuper(param: SearchHighTechParam) {
  return requestUtils.post(`/superAdmin/searchHighTech`, {
    data: param,
  });
}
type UpdateHighTechType = {
  financeId?: string;
  date: string;
  amount: number;
  companyId?: string;
};
export function requestUpdateHighTechSuper(
  param: UpdateHighTechType & { indexNum?: number },
) {
  return requestUtils.post(`/superAdmin/updateHighTech`, {
    data: param,
  });
}

export function requestDeleteHighTechSuper(param: string) {
  return requestUtils.post(`/superAdmin/deleteHighTech/${param}`);
}
//  软著模块
type SearchSoftwareWritingParam = {
  companyId?: string;
  startTime?: string;
  endTime?: string;
  license?: string;
  accreditationAgency?: string;
  current: number;
  size: number;
};
export function requestSoftwareWritingSuper(param: SearchSoftwareWritingParam) {
  return requestUtils.post(`/superAdmin/searchSoftwareWriting`, {
    data: param,
  });
}
type UpdateSoftwareWritingType = {
  financeId?: string;
  date: string;
  amount: number;
  companyId?: string;
};
export function requestUpdateSoftwareWritingSuper(
  param: UpdateSoftwareWritingType & { indexNum?: number },
) {
  return requestUtils.post(`/superAdmin/updateSoftwareWriting`, {
    data: param,
  });
}

export function requestDeleteSoftwareWritingSuper(param: string) {
  return requestUtils.post(`/superAdmin/deleteSoftwareWriting/${param}`);
}
//  TBI信息模块
type SearchIndustryLayoutParam = {
  companyId?: string;
  type: string;
  name: string;
  current: number;
  size: number;
};
export function requestIndustryLayoutSuper(param: SearchIndustryLayoutParam) {
  return requestUtils.post(`/superAdmin/searchIndustryType`, {
    data: param,
  });
}
type UpdateIndustryLayoutType = {
  industryTypeId?: string;
  name: string;
  type: number;
  companyId?: string;
};
export function requestUpdateIndustryLayoutSuper(
  param: UpdateIndustryLayoutType & { indexNum?: number },
) {
  return requestUtils.post(`/superAdmin/updateIndustryType`, {
    data: param,
  });
}
export function requestDeleteIndustryLayoutSuper(param: string) {
  return requestUtils.post(`/superAdmin/deleteIndustryType/${param}`);
}

//  企业资质模块
type SearchQualificationParam = {
  companyId?: string;
  startTime?: string;
  endTime?: string;
  state?: string;
  current: number;
  size: number;
};
export function requestQualificationSuper(param: SearchQualificationParam) {
  return requestUtils.post(`/superAdmin/searchQualificationCertificate`, {
    data: param,
  });
}
type UpdateQualificationType = {
  qualificationCertificateId?: string;
  state?: string;
  name: string;
  type: string;
  number: string;
  issuingTime: string;
  closingTime: string;
  companyId?: string;
};
export function requestUpdateQualificationSuper(
  param: UpdateQualificationType & { indexNum?: number },
) {
  return requestUtils.post(`/superAdmin/updateQualificationCertificate`, {
    data: param,
  });
}
export function requestDeleteQualificationSuper(param: string) {
  return requestUtils.post(
    `/superAdmin/deleteQualificationCertificate/${param}`,
  );
}

//企业中心管理
type SearchCompanyInfoParam = {
  companyId?: string;
  companyName?: string;
  provinceId?: string;
  cityId?: string;
  //变量名 接口文档与apipost不同
  districtId: string;
  //industryTypeId?
  type: string[];
  current: number;
  size: number;
};
export function requestCompanyInfoSuper(param: SearchCompanyInfoParam) {
  return requestUtils.post(`/superAdmin/searchCompany`, {
    data: param,
  });
}
type UpdateCompanyInfoType = {
  companyId?: string;
  name: string;
  creditCode?: string;
  phone?: string;
  postCode?: string;
  email?: string;
  legalRepresentative?: string;
  validTime?: string;
  industryTypeId?: string;
  registeredCapital?: number;
  registeredTime?: string;
  registeredAddress?: string;
  registerStatus?: string;
  website?: string;
  provinceId?: number;
  cityId?: string;
  districtId?: number;
  address?: string;
  longitude?: number;
  latitude?: number;
  trademarks?: number;
};
export function requestUpdateCompanyInfoSuper(param: UpdateCompanyInfoType) {
  return requestUtils.post(`/superAdmin/saveOrUpdateCompany`, {
    data: param,
  });
}
export function requestDeleteCompanyInfoSuper(param: string) {
  return requestUtils.post(`/superAdmin/deleteCompany/${param}`);
}

//超级用户管理
export type SearchUserParam = {
  companyId: string;
  name: string;
  phone: string;
  state: number;
  current: number;
  size: number;
};
export function requestUserSuper(param: SearchUserParam) {
  return requestUtils.post(`/superAdmin/searchUser`, {
    data: param,
  });
}
type UpdateUserType = {
  userId?: string;
  name: string;
  sex: number;
  phone: string;
  role?: number;
  state: string;
};
export function requestUpdateUserSuper(
  param: UpdateUserType & { indexNum?: number },
) {
  return requestUtils.post(`/superAdmin/updateUser`, {
    data: param,
  });
}
type DeleteUserType = {
  userId: string;
  role?: number;
};
export function requestDeleteUserSuper(param: DeleteUserType) {
  return requestUtils.post(`/superAdmin/deleteUser`, {
    data: param,
  });
}
//模型列表
export type SearchModelParam = {
  current: number;
  size: number;
};
export function requestModel() {
  return requestUtils.get(`/superAdmin/getModel`);
}
type UpdateModel = {
  modelId?: string;
  modelName: string;
  proportion: number;
};
export function requestUpdateModel(param: UpdateModel[]) {
  return requestUtils.post(`/superAdmin/editProportion`, {
    data: param,
  });
}

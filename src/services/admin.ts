import { requestUtils } from '../utils/request';
import { number } from 'echarts';

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
  state: number;
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
export function requestUpdateUser(param: UpdateUserType & { index?: number }) {
  return requestUtils.post(`/admin/updateUser`, {
    data: param,
  });
}
type DeleteUserType = {
  userId?: string;
  role?: number;
};
export function requestDeleteUser(param: DeleteUserType) {
  return requestUtils.post(`/admin/deleteUser`, {
    data: param,
  });
}

//预测信息管理
export type SearchPredictionInfoParam = {
  companyId: string;
  name: string;
  current: number;
  size: number;
};
export function requestPredictionInfo(param: SearchPredictionInfoParam) {
  return requestUtils.post(`/admin/searchPredictData`, {
    data: param,
  });
}
type UpdatePredictionInfo = {
  predictionId?: string;
  name: string;
  data1: number[];
  data2: number[];
  unit?: string;
  companyId: string;
};
export function requestUpdatePredictionInfo(
  param: UpdatePredictionInfo & { index?: number },
) {
  return requestUtils.post(`/admin/updatePredictData`, {
    data: param,
  });
}
export function requestSavePredictionInfo(
  param: UpdatePredictionInfo & { index?: number },
) {
  return requestUtils.post(`/admin/savePredictData`, {
    data: param,
  });
}
export function requestDeletePredictionInfo(param: string) {
  return requestUtils.post(`/admin/deletePredictData/${param}`);
}

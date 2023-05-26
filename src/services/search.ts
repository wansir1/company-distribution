import { requestUtils } from '../utils/request';

interface paramsType {
  provinceId?: string;
  cityId?: string;
  typeIdList?: string[];
}

export function requestCity(param: string) {
  return requestUtils.get(`user/getCitysByProvinceId/${param}`);
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

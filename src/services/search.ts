import { requestUtils } from '../utils/request';

interface paramsType {
  provinceId?: string;
  cityId?: string;
  typeId?: string;
}

export function requestCity(param:string) {
  return requestUtils.get(`user/getCitysByProvinceId/${param}`);
}

export function requestCompany(param:paramsType) {
  return requestUtils.post(`/user/searchCompany`, {
    data: param,
  });
}

export function requestIndustryType() {
  return requestUtils.get(`/user/getTypeList`);
}
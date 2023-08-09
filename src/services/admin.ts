import { requestUtils } from '../utils/request';

// 获取行业类别
export type IndustryType = {
  typeId: string;
  name: string;
};
export function requestIndustryType() {
  return requestUtils.get(`/admin/getTypeList`);
}

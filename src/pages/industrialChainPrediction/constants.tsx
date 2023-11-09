import { requestUtils } from '../../utils/request';

export interface predictionInfoType {
  predictId: string;
  name: string;
}
export function requestPredictionInfoList(param: string) {
  return requestUtils.post(`/user/getPredictDataName/${param}`);
}
export interface predictDataParam {
  predictId: string;
  mode: number;
  predStep: number;
}
export function requestPredictData(param: predictDataParam) {
  return requestUtils.post(`/user/predictData`, { data: param });
}
export interface predictDataType {
  predictData1: number[];
  predictData2: number[];
  units: string;
}
export const getPreContentUnit = (preContent: string): string => {
  if (preContent === '专利') return '专利数量(件)';
  else if (preContent === '北斗产业总体年产值') return '万元';
  return '';
};

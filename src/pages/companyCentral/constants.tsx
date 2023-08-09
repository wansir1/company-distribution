import {
  requestCity,
  requestDistricts,
  requestProvince,
  ProvinceData,
  CityData,
  DistrictsData,
} from '@/services/search';
import { requestIndustryType, IndustryType } from '@/services/admin';

export const getProvince = async () => {
  try {
    const data: ProvinceData[] = await requestProvince();
    return data.map((item) => ({
      provinceName: item.provinceName,
      provinceId: item.provinceId,
    }));
  } catch (e) {
    console.log(e);
  }
  return [];
};

export const getCity = async (param: string) => {
  if (!param) return [];
  try {
    const data: CityData[] = await requestCity(param);
    return data.map((item) => ({
      cityName: item.cityName,
      cityId: item.cityId,
    }));
  } catch (e) {
    console.log(e);
  }
  return [];
};
export const getDistrict = async (param: string) => {
  if (!param) return [];
  try {
    const data: DistrictsData[] = await requestDistricts(param);
    return data.map((item) => ({
      districtName: item.districtName,
      districtId: item.districtId,
    }));
  } catch (e) {
    console.log(e);
  }
  return [];
};
export const getIndustryType = async () => {
  try {
    const data: IndustryType[] = await requestIndustryType();
    return data.map((item) => ({ name: item.name, typeId: item.typeId }));
  } catch (e) {
    console.log(e);
  }
  return [];
};

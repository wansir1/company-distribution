//技术详情数据类型接口
export interface TechnologyResType {
  //融资情况
  resultCompanyFinances: ResultCompanyFinances;
  //商标信息情况
  resultCompanyTrademarks: ResultCompanyTrademarks;
  //技术业务方向数据 0-业务 1-技术
  resultIndustryTypeVOS: ResultIndustryTypeVOS[];
  //专利数量数据映射
  searchFormatPatentMap: SearchFormatPatentMap;
}
export interface ResultCompanyFinances {
  financeItems: number;
  financeMapList: pieDataMap[];
  financeRatio: number;
}
export interface pieDataMap {
  type: number;
  value: number;
  flag: number;
}
export interface ResultCompanyTrademarks {
  trademarkItems: number;
  trademarkMapList: pieDataMap[];
  trademarkRatio: number;
}

export interface ResultIndustryTypeVOS {
  industryTypeId: string;
  name: string;
  type: number;
  companyId: number;
}
export interface SearchFormatPatentMap {
  invention: number[];
  appearanceDesign: number[];
  utilityModel: number[];
}

export interface InvestmentResType {
  //对外投资公司数据
  companyInvestmentVOList: CompanyInvestmentVO[];
  //词云图数据
  investmentIndustryTypeVOList: InvestmentIndustryTypeVO[];
  //企业资质数据
  qualificationCertificateVOList: QualificationCertificateVO[];
  //软件著作权
  softwareWritingVOList: SoftwareWritingVO[];
}

export interface CompanyInvestmentVO {
  companyInvestmentId: number;
  name: string;
  ratio: number;
  amount: number;
  companyId: number;
}

export interface InvestmentIndustryTypeVO {
  name: string;
  value: number;
}
export interface QualificationCertificateVO {
  closingTime: string;
  issuingTime: string;
  issuingAuthority: string;
  companyId: number;
  type: string;
  name: string;
  number: string;
  qualificationCertificateId: number;
  state: string;
}
export interface SoftwareWritingVO {
  abbreviation: string;
  companyId: string;
  finishTime: string;
  firstPublicTime: string;
  name: string;
  registrationNumber: string;
  registrationTime: string;
  softwareWritingId: string;
  takePowerWay: string;
  versionNumber: string;
}

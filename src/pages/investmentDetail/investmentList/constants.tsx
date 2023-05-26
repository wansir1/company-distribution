import type { ColumnsType } from 'antd/es/table';
type InvestmentType = {
  serialNumber?: number;
  companyName: string;
  investmentRatio: string;
  investmentAmount: string;
};

//投资列表
export const investmentColumns: ColumnsType<InvestmentType> = [
  {
    title: '序号',
    dataIndex: 'serialNumber',
    key: 'serialNumber',
    align: 'center',
    render: (record, data, index) => {
      return <span>{index + 1}</span>;
    },
  },
  {
    title: '公司名称',
    dataIndex: 'companyName',
    key: 'companyName',
    align: 'center',
  },
  {
    title: '投资比例',
    dataIndex: 'investmentRatio',
    key: 'investmentRatio',
    align: 'center',
  },
  {
    title: '投资金额',
    dataIndex: 'investmentAmount',
    key: 'investmentAmount',
    align: 'center',
  },
];
//投资企业假数据
export const investment_Data: InvestmentType[] = [
  {
    companyName: '成都汉信众科电子科技有限公司',
    investmentRatio: '80%',
    investmentAmount: '1600万元',
  },
  {
    companyName: '珠海同方爱德科技有限公司',
    investmentRatio: '94%',
    investmentAmount: '470万元',
  },
  {
    companyName: '九江柒壹叁医院有限公司',
    investmentRatio: '100%',
    investmentAmount: '3020万元',
  },
  {
    companyName: '九江同方信息技术有限公司',
    investmentRatio: '100%',
    investmentAmount: '1500万元',
  },
  {
    companyName: '九江同方物业管理有限公司',
    investmentRatio: '100%',
    investmentAmount: '50万元',
  },
  {
    companyName: '九江青竹标致电子有限公司',
    investmentRatio: '50%',
    investmentAmount: '63万元',
  },
];

import React from 'react';
import { Table } from 'antd/es';
import Title from '@/components/Title';
import {
  investmentColumns,
  InvestmentType,
} from '@/pages/investmentDetail/investmentList/constants';
import { CompanyInvestmentVO } from '@/pages/investmentDetail/constants';
interface PropType {
  companyInvestmentVOList: CompanyInvestmentVO[];
}
const InvestmentList: React.FC<PropType> = (props) => {
  const { companyInvestmentVOList } = props;
  const companyInvestmentList: InvestmentType[] = companyInvestmentVOList?.map(
    (item, index) => {
      return {
        serialNumber: index + 1,
        name: item.name,
        ratio: item.ratio,
        amount: item.amount,
      };
    },
  );
  return (
    <div>
      <Title
        text="投资的企业列表"
        style={{ marginBottom: '3px', fontSize: '16px' }}
      />
      <Table
        className=""
        columns={investmentColumns}
        dataSource={companyInvestmentList}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          showTotal: () => `共${companyInvestmentVOList.length}条`,
        }}
        bordered
        size="small"
      />
    </div>
  );
};

export default InvestmentList;

import React from 'react';
import { Table } from 'antd/es';
import Title from '@/components/Title';
import {
  investment_Data,
  investmentColumns,
} from '@/pages/investmentDetail/investmentList/constants';

const InvestmentList: React.FC = () => {
  return (
    <div>
      <Title
        text="投资的企业列表"
        style={{ marginBottom: '3px', fontSize: '16px' }}
      />
      <Table
        className=""
        columns={investmentColumns}
        dataSource={investment_Data}
        pagination={false}
        bordered
        size="small"
      />
    </div>
  );
};

export default InvestmentList;

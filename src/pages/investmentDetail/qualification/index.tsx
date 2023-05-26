import React from 'react';
import Title from '@/components/Title';
import { Table } from 'antd/es';
import {
  copyright_Data,
  copyrightColumns,
  qualification_Data,
  qualificationColumns,
} from '@/pages/investmentDetail/qualification/constants';

const Qualification: React.FC = () => {
  return (
    <div>
      <Title
        text="软件著作权"
        style={{ marginBottom: '3px', fontSize: '16px' }}
      />
      <Table
        className=""
        columns={copyrightColumns}
        dataSource={copyright_Data}
        pagination={{
          pageSize: 5,
          showTotal: () => `共${copyright_Data.length}条`,
        }}
        bordered
        size="small"
      />
      <Title
        text="企业资质"
        style={{ marginBottom: '3px', fontSize: '16px' }}
      />
      <Table
        className=""
        columns={qualificationColumns}
        dataSource={qualification_Data}
        pagination={{
          pageSize: 5,
          showTotal: () => `共${qualification_Data.length}条`,
        }}
        bordered
        size="small"
      />
    </div>
  );
};

export default Qualification;

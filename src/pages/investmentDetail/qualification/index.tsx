import React from 'react';
import Title from '@/components/Title';
import { Table } from 'antd/es';
import {
  copyrightColumns,
  CopyrightType,
  qualificationColumns,
  QualificationType,
} from '@/pages/investmentDetail/qualification/constants';
import {
  QualificationCertificateVO,
  SoftwareWritingVO,
} from '@/pages/investmentDetail/constants';
interface PropType {
  qualificationCertificateVOList: QualificationCertificateVO[];
  softwareWritingVOList: SoftwareWritingVO[];
}
const Qualification: React.FC<PropType> = (props) => {
  const { softwareWritingVOList, qualificationCertificateVOList } = props;
  const softwareWritingList: CopyrightType[] = softwareWritingVOList?.map(
    (item, index) => {
      return {
        serialNumber: index + 1,
        name: item.name,
        registrationTime: item.registrationTime,
        versionNumber: item.versionNumber,
        registrationNumber: item.registrationNumber,
      };
    },
  );
  const qualificationCertificateList: QualificationType[] =
    qualificationCertificateVOList?.map((item, index) => {
      return {
        serialNumber: index + 1,
        name: item.name,
        type: item.type,
        number: item.number,
        issuingTime: item.issuingTime,
        closingTime: item.closingTime,
      };
    });
  return (
    <div>
      <Title
        text="软件著作权"
        style={{ marginBottom: '3px', fontSize: '16px' }}
      />
      <Table
        className=""
        columns={copyrightColumns}
        dataSource={softwareWritingList}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          showTotal: () => `共${softwareWritingVOList.length}条`,
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
        dataSource={qualificationCertificateList}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          showTotal: () => `共${qualificationCertificateVOList.length}条`,
        }}
        bordered
        size="small"
      />
    </div>
  );
};

export default Qualification;

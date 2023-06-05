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
  let softwareWritingList: CopyrightType[] = softwareWritingVOList?.map(
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
  softwareWritingList
    .sort((a, b) => b.registrationTime.localeCompare(a.registrationTime))
    .forEach((item, index) => {
      softwareWritingList[index] = { ...item, serialNumber: index + 1 };
    });
  let qualificationCertificateList: QualificationType[] =
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
  qualificationCertificateList
    .sort((a, b) => b.issuingTime.localeCompare(a.issuingTime))
    .forEach((item, index) => {
      qualificationCertificateList[index] = {
        ...item,
        serialNumber: index + 1,
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

import React, { useContext, useEffect, useState } from 'react';
import searchStyles from '@/pages/companySearch/index.less';
import { Col, Row, Spin } from 'antd';
import styles from '@/pages/technologyDetail/index.less';
import Qualification from '@/pages/investmentDetail/qualification';
import InvestmentList from '@/pages/investmentDetail/investmentList';
import WordCloudMap from '@/pages/investmentDetail/wordCloudMap';
import { GlobalInfoContext } from '@/pages/layouts';
import { requestCompanyInvestment } from '@/services/search';
import { InvestmentResType } from '@/pages/investmentDetail/constants';
const InvestmentDetail: React.FC = () => {
  const { layoutState, setLayoutState } = useContext(GlobalInfoContext);
  const companyId = layoutState.companyId;
  const [loading, setLoading] = useState(true);
  const [investmentData, setInvestmentData] = useState<InvestmentResType | {}>(
    {},
  );
  const {
    companyInvestmentVOList,
    investmentIndustryTypeVOList,
    qualificationCertificateVOList,
    softwareWritingVOList,
  } = investmentData as InvestmentResType;
  useEffect(() => {
    getData({ companyId });
  }, []);
  const getData = async (param: { companyId: string }) => {
    try {
      const res: any = await requestCompanyInvestment(param);
      console.log(res, '投资详情res');
      if (!('code' in res)) {
        setInvestmentData(res);
      } else {
        setInvestmentData({});
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  if (loading) {
    return (
      <Spin
        size="large"
        spinning={loading}
        tip={'加载中'}
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
        }}
      />
    );
  }
  return (
    <div className={searchStyles.wrapper}>
      <Row
        gutter={[8, 0]}
        style={{
          position: 'relative',
          top: '10px',
          marginLeft: '6px',
          marginRight: '6px',
        }}
      >
        <Col span={12}>
          <div className={styles.colBox}>
            <Qualification
              qualificationCertificateVOList={qualificationCertificateVOList}
              softwareWritingVOList={softwareWritingVOList}
            />
          </div>
        </Col>
        <Col span={12}>
          <div className={styles.colBox} style={{ height: '320px' }}>
            <InvestmentList companyInvestmentVOList={companyInvestmentVOList} />
          </div>

          <div
            className={styles.colBox}
            style={{ height: '328px', marginTop: '8px' }}
          >
            <WordCloudMap
              investmentIndustryTypeVOList={investmentIndustryTypeVOList}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default InvestmentDetail;

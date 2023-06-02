import React from 'react';
import searchStyles from '@/pages/companySearch/index.less';
import { Col, Row } from 'antd';
import styles from '@/pages/technologyDetail/index.less';
import Qualification from '@/pages/investmentDetail/qualification';
import InvestmentList from '@/pages/investmentDetail/investmentList';
import WordCloudMap from '@/pages/investmentDetail/wordCloudMap';
const InvestmentDetail: React.FC = () => {
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
            <Qualification />
          </div>
        </Col>
        <Col span={12}>
          <div className={styles.colBox} style={{ height: '320px' }}>
            <InvestmentList />
          </div>

          <div
            className={styles.colBox}
            style={{ height: '328px', marginTop: '8px' }}
          >
            <WordCloudMap />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default InvestmentDetail;

import React from 'react';
import { Row, Col } from 'antd';
import styles from './index.less';
import CompanyPatent from '@/pages/technologyDetail/companyPatent';
import Financing from '@/pages/technologyDetail/Trademark';
import Trademark from '@/pages/technologyDetail/Financing';

const TechnologyDetail: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Row
        gutter={[8, 0]}
        style={{
          position: 'relative',
          top: '10px',
          marginLeft: '6px',
          marginRight: '6px',
        }}
      >
        <Col span={13}>
          <div className={styles.colBox}>
            <CompanyPatent />
          </div>
        </Col>

        <Col span={11}>
          <div className={styles.colBox} style={{ height: '320px' }}>
            <Financing />
          </div>

          <div
            className={styles.colBox}
            style={{ height: '328px', marginTop: '8px' }}
          >
            <Trademark />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TechnologyDetail;

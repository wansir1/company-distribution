import React from 'react';
import { Row, Col } from 'antd';
import searchStyles from '@/pages/companySearch/index.less';
import styles from './index.less';
import CompanyPatent from '@/pages/technologyDetail/companyPatent';
import PowerChart from '@/pages/technologyDetail/powerChart';
import CompanyScore from '@/pages/technologyDetail/companyScore';

const TechnologyDetail: React.FC = () => {
  return (
    <div className={searchStyles.wrapper}>
      <Row
        gutter={[8, 0]}
        style={{
          position: 'relative',
          top: '20px',
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
            <PowerChart />
          </div>

          <div
            className={styles.colBox}
            style={{ height: '328px', marginTop: '8px' }}
          >
            <CompanyScore />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TechnologyDetail;

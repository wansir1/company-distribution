import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Spin } from 'antd';
import styles from './index.less';
import CompanyPatent from '@/pages/technologyDetail/companyPatent';
import Trademark from '@/pages/technologyDetail/Trademark';
import Financing from '@/pages/technologyDetail/Financing';
import { GlobalInfoContext } from '@/pages/layouts';
import { requestCompanyTechnology } from '@/services/search';
import { TechnologyResType } from '@/pages/technologyDetail/constans';

const TechnologyDetail: React.FC = () => {
  const { layoutState, setLayoutState } = useContext(GlobalInfoContext);
  const companyId = layoutState.companyId;
  const [loading, setLoading] = useState(true);
  const [technologyData, setTechnologyData] = useState<TechnologyResType | {}>(
    {},
  );
  const {
    resultCompanyFinances,
    resultCompanyTrademarks,
    resultIndustryTypeVOS,
    searchFormatPatentMap,
  } = technologyData as TechnologyResType;
  useEffect(() => {
    getData({ companyId });
  }, []);
  const getData = async (param: { companyId: string }) => {
    try {
      const res: any = await requestCompanyTechnology(param);
      console.log(res, '技术详情res');
      if (!('code' in res)) {
        setTechnologyData(res);
      } else {
        setTechnologyData({});
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
            <CompanyPatent
              resultIndustryTypeVOS={resultIndustryTypeVOS}
              searchFormatPatentMap={searchFormatPatentMap}
            />
          </div>
        </Col>

        <Col span={11}>
          <div className={styles.colBox} style={{ height: '320px' }}>
            <Trademark resultCompanyTrademarks={resultCompanyTrademarks} />
          </div>

          <div
            className={styles.colBox}
            style={{ height: '328px', marginTop: '8px' }}
          >
            <Financing resultCompanyFinances={resultCompanyFinances} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TechnologyDetail;

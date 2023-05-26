import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { requestIndustryType } from '@/services/search';
import SelectSearch, { TypeListType } from '../companySearch/selectSearch';
import {
  EnterpriseNumber,
  GrowthRate,
  MapDistribution,
} from './echartComponent';
import styles from './index.less';
import planet from '@/assets/images/planet.gif';

const IndustrialChain: React.FC = (props) => {
  const [typeList, setTypeList] = useState<TypeListType>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getTypeList();
  }, []);
  const getTypeList = async () => {
    const typeList: TypeListType = await requestIndustryType();
    Array.isArray(typeList) ? setTypeList(typeList) : setTypeList([]);
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
  console.log({ typeList, loading }, 'lll');
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.firstRow}>
          <div className={styles.box}>
            <EnterpriseNumber />
          </div>
          <div className={styles.textBox}>
            {/* <div className={styles.search} style={{ alignItems: 'center' }}>
              <SelectSearch typeList={typeList} single={true} />
            </div> */}
            <div className={styles.text}>多维度产业分析</div>
            <img src={planet} style={{ height: '19vh', borderRadius: '50%' }} />
          </div>
          <div className={styles.box}>
            <EnterpriseNumber componentNumber={2} />
          </div>
          <div className={styles.box}>
            <GrowthRate />
          </div>
          <div className={styles.box}>
            <GrowthRate componentNumber={2} />
          </div>
          <div className={styles.box}>
            <GrowthRate componentNumber={3} />
          </div>
        </div>
        <div className={styles.secondRow}>
          <div className={styles.box}>
            <MapDistribution />
          </div>
          <div className={styles.box}>
            <MapDistribution componentNumber={2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustrialChain;

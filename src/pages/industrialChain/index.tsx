import React, { useState, useEffect, Fragment } from 'react';
import { Link, history } from 'umi';
import { Spin } from 'antd';
import { requestIndustryType } from '@/services/search';
import { TypeListType } from '../companySearch/selectSearch';
import {
  EnterpriseNumber,
  GrowthRate,
  MapDistribution,
} from './echartComponent';
import ModalBox from '@/components/ModalBox';
import styles from './index.less';
import planet from '@/assets/images/planet.gif';

const IndustrialChain: React.FC = (props) => {
  const [typeList, setTypeList] = useState<TypeListType>([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [modalSelect, setModalSelect] = useState<number | null>(null);
  const pointEvent = { pointerEvents: 'none' };
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
  const componentMapping: { [key: number]: React.ReactNode } = {
    11: <EnterpriseNumber />,
    12: <EnterpriseNumber componentNumber={2} />,
    21: <GrowthRate />,
    22: <GrowthRate componentNumber={2} />,
    23: <GrowthRate componentNumber={3} />,
    31: <MapDistribution />,
    32: <MapDistribution componentNumber={2} />,
  };
  const handleClick = (num: number) => {
    setVisible(true);
    setModalSelect(num);
  };
  return (
    <Fragment>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.firstRow}>
            <div className={styles.box} onClick={() => handleClick(11)}>
              <EnterpriseNumber styles={pointEvent} />
            </div>

            <div className={styles.textBox}>
              <div className={styles.text}>多维度产业分析</div>
              <img
                src={planet}
                style={{ height: '17vh', borderRadius: '50%' }}
              />
            </div>
            <div className={styles.box} onClick={() => handleClick(12)}>
              <EnterpriseNumber componentNumber={2} styles={pointEvent} />
            </div>
            <div className={styles.box} onClick={() => handleClick(21)}>
              <GrowthRate styles={pointEvent} />
            </div>
            <div className={styles.box} onClick={() => handleClick(22)}>
              <GrowthRate componentNumber={2} styles={pointEvent} />
            </div>
            <div className={styles.box} onClick={() => handleClick(23)}>
              <GrowthRate componentNumber={3} styles={pointEvent} />
            </div>
          </div>
          <div className={styles.secondRow}>
            <div className={styles.box} onClick={() => handleClick(31)}>
              <MapDistribution styles={pointEvent} />
            </div>
            <div className={styles.box} onClick={() => handleClick(32)}>
              <MapDistribution componentNumber={2} styles={pointEvent} />
            </div>
          </div>
        </div>
      </div>
      <ModalBox
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      >
        {modalSelect && componentMapping[modalSelect]}
      </ModalBox>
    </Fragment>
  );
};

export default IndustrialChain;

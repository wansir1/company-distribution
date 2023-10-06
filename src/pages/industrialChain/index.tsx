import React, { useState, useEffect, Fragment } from 'react';
import { Radio, Space, Spin, Select, DatePicker } from 'antd';
import type { RadioChangeEvent } from 'antd';
import type { DatePickerProps } from 'antd';
import {
  requestIndustryChain,
  ChainDataType,
  PatentStatisticsVO,
  GrowthRateVO,
  DistributionVO,
} from '@/services/search';
import moment from 'moment';
import {
  EnterpriseNumber,
  GrowthRate,
  MapDistribution,
} from './echartComponent';
import ModalBox from '@/components/ModalBox';
import styles from './index.less';
import planet from '@/assets/images/planet.gif';
import Tip from '@/components/Tip';
import zhCN from 'antd/es/date-picker/locale/zh_CN';
const pointEvent = { pointerEvents: 'none' };
const IndustrialChain: React.FC = (props) => {
  const [dataList, setDataList] = useState<ChainDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [modalSelect, setModalSelect] = useState<number | null>(null);
  const [growthType, setGrowthType] = useState('1');
  const [date, setDate] = useState<string>(
    moment().subtract(1, 'quarter').format('YYYYMM'),
  );
  const timeType = growthType == '1' ? 'quarter' : 'month';
  let patentStatisticsV: PatentStatisticsVO | undefined = void 0,
    growthRateV: GrowthRateVO | undefined = void 0,
    distributionV: DistributionVO | undefined = void 0;
  useEffect(() => {
    getAllData();
  }, [date]);
  const getAllData = async () => {
    let year = date.slice(0, 4);
    let month = date.slice(-1);
    if (growthType == '1') {
      let temp: { [key: string]: string } = {
        '1': '4',
        '4': '7',
        '7': '10',
        '0': '1',
      };
      if (month == '0') {
        year = (Number(year) + 1).toString();
      }
      month = temp[month];
    }
    const dataList: ChainDataType = await requestIndustryChain({
      year,
      month,
      type: growthType,
    });
    if ('code' in dataList) {
      console.log(dataList);
      setDataList(null);
    } else {
      setDataList(dataList);
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
  if (dataList !== null) {
    const { patentStatisticsVO, growthRateVO, distributionVO } = dataList;
    patentStatisticsV = patentStatisticsVO;
    growthRateV = growthRateVO;
    distributionV = distributionVO;
    console.log({ dataList, patentStatisticsV, growthRateV, distributionV });
  }
  const componentMapping: { [key: number]: React.ReactNode } = {
    11: <EnterpriseNumber />,
    12: (
      <EnterpriseNumber
        componentNumber={2}
        patentStatisticsV={patentStatisticsV}
      />
    ),
    21: <GrowthRate growthRateV={growthRateV} growthType={growthType} />,
    22: (
      <GrowthRate
        componentNumber={2}
        growthRateV={growthRateV}
        growthType={growthType}
      />
    ),
    23: (
      <GrowthRate
        componentNumber={3}
        growthRateV={growthRateV}
        growthType={growthType}
      />
    ),
    31: <MapDistribution distributionV={distributionV} />,
    32: <MapDistribution componentNumber={2} distributionV={distributionV} />,
  };
  const handleClick = (num: number) => {
    //组件放大点击事件
    setVisible(true);
    setModalSelect(num);
  };
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    setDate(dateString);
  };
  const disabledDate = (current: any) => {
    // Can not select days after today
    return current && current > moment().endOf(timeType).subtract(1, timeType);
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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignSelf: 'flex-start',
                  marginBottom: '5px',
                }}
              >
                <b>增长率：</b>
                <Radio.Group
                  value={growthType}
                  size="small"
                  onChange={({ target: { value } }: RadioChangeEvent) => {
                    setGrowthType(value);
                    const currentDate = moment()
                      .subtract(1, value == '1' ? 'quarter' : 'month')
                      .format('YYYYMM');
                    setDate(currentDate);
                  }}
                >
                  <Radio.Button value="1">
                    季度增长率
                    <Tip
                      content={
                        '(本季度实际完成量 - 上一年同季度实际量) / 上一年同季度实际量'
                      }
                      imgStyle={{ margin: '0px 7px 2px' }}
                    ></Tip>
                  </Radio.Button>
                  <Radio.Button value="2">
                    月度增长率
                    <Tip
                      content={'(本月实际完成量 - 上月实际量) / 上月实际量'}
                      imgStyle={{ margin: '0px 7px 2px' }}
                    ></Tip>
                  </Radio.Button>
                </Radio.Group>
                <DatePicker
                  onChange={onChange}
                  value={date ? moment(date, 'YYYYMM') : null}
                  format="YYYYMM"
                  allowClear={false}
                  disabledDate={disabledDate}
                  locale={zhCN}
                  picker={timeType}
                  size="small"
                />
              </div>
              <img
                src={planet}
                style={{ height: '17vh', borderRadius: '50%' }}
              />
            </div>
            <div className={styles.box} onClick={() => handleClick(12)}>
              <EnterpriseNumber
                componentNumber={2}
                patentStatisticsV={patentStatisticsV}
                styles={pointEvent}
              />
            </div>
            <div className={styles.box} onClick={() => handleClick(21)}>
              <GrowthRate
                styles={pointEvent}
                growthRateV={growthRateV}
                growthType={growthType}
              />
            </div>
            <div className={styles.box} onClick={() => handleClick(22)}>
              <GrowthRate
                componentNumber={2}
                styles={pointEvent}
                growthRateV={growthRateV}
                growthType={growthType}
              />
            </div>
            <div className={styles.box} onClick={() => handleClick(23)}>
              <GrowthRate
                componentNumber={3}
                styles={pointEvent}
                growthRateV={growthRateV}
                growthType={growthType}
              />
            </div>
          </div>
          <div className={styles.secondRow}>
            <div className={styles.box} onClick={() => handleClick(31)}>
              <MapDistribution
                styles={pointEvent}
                distributionV={distributionV}
              />
            </div>
            <div className={styles.box} onClick={() => handleClick(32)}>
              <MapDistribution
                componentNumber={2}
                styles={pointEvent}
                distributionV={distributionV}
              />
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

import React, { useState, useEffect, Fragment } from 'react';
import { Typography, Space, Popover, Divider, Table, Spin } from 'antd';
import { requestCompanyBusiness } from '@/services/search';
import Title from '@/components/Title';
import {
  businessInfoList,
  columns,
  technologyColumns,
  ResType,
  getTable,
  ReleaseType,
  TechnologyType,
  ResultGoPublicVO,
  ColumnHighTechVO,
} from './constants';
import styles from './index.less';
const { Link } = Typography;
const MAX_SPANS = 3;
interface PropType {
  companyId: string;
}

const CompanyInfo: React.FC<PropType> = (props) => {
  const { companyId } = props;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [businessData, setBusinessData] = useState<ResType | {}>({});
  const {
    companyBusinessLayoutInfo,
    companyBusinessIndustryInfo,
    resultGoPublicVO,
    resultHighTechVO,
  } = businessData as ResType;
  const moreSpan = companyBusinessLayoutInfo?.resultIndustryTypeVOList
    ?.filter((item) => item.type == 2)
    .slice(MAX_SPANS);
  const content = (
    <div className={styles.spanColor}>
      <Space className={styles.space}>
        {moreSpan?.map((item, index) => {
          return <span key={index}>{item.name}</span>;
        })}
      </Space>
    </div>
  );
  useEffect(() => {
    getData({ companyId });
  }, [companyId]);
  const getData = async (param: { companyId: string }) => {
    try {
      const res: ResType = await requestCompanyBusiness(param);
      console.log(res, 'res');
      if (!('code' in res)) {
        setBusinessData(res);
      } else {
        setBusinessData({});
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
  console.log(businessData, 'kk');
  return (
    <div>
      <Title
        text={companyBusinessIndustryInfo?.name || '--'}
        style={{ marginBottom: '3px' }}
      />
      <div style={{ marginLeft: '8px', fontSize: '8px' }}>
        <span style={{ marginRight: '30px' }}>
          地址:{companyBusinessLayoutInfo?.registeredAddress || '--'}
        </span>
        <Link href={companyBusinessLayoutInfo?.website} target="_blank">
          网址:{companyBusinessLayoutInfo?.website || '--'}
        </Link>
        <div className={styles.spanColor}>
          <Space className={styles.firstSpace}>
            {companyBusinessLayoutInfo?.resultGoPublicVO?.plate && (
              <span>{`${companyBusinessLayoutInfo?.resultGoPublicVO?.plate}
              (${companyBusinessLayoutInfo?.resultGoPublicVO?.securitiesCode})`}</span>
            )}
            {companyBusinessLayoutInfo?.isHighTech && <span>高新技术企业</span>}
          </Space>
          <div className={styles.secondRow}>
            <Space>
              {companyBusinessLayoutInfo?.resultIndustryTypeVOList
                .filter((item) => item.type == 2)
                .slice(0, MAX_SPANS)
                .map((item, index) => {
                  return <span key={index}>{item.name}</span>;
                })}
              {companyBusinessLayoutInfo?.resultIndustryTypeVOList.filter(
                (item) => item.type == 2,
              ).length > MAX_SPANS && (
                <Popover
                  content={content}
                  trigger="click"
                  open={visible}
                  onOpenChange={(v) => setVisible(v)}
                >
                  <span style={{ cursor: 'pointer' }}>更多产业标签 ...</span>
                </Popover>
              )}
            </Space>
          </div>
        </div>
      </div>
      <Title
        text="工商信息"
        style={{ marginBottom: '3px', marginTop: '30px', fontSize: '16px' }}
      />
      <div className={styles.businessInfo}>
        {businessInfoList.map((item, index) => {
          if (index % 2 === 1) {
            return (
              <Fragment>
                <p
                  key={index}
                  style={{
                    color: 'rgba(59,46,126,0.9)',
                    display: 'inline-block',
                    marginTop: '10px',
                    fontWeight: 'bold',
                    textAlign: 'right',
                  }}
                >
                  {item.value}:
                  <span style={{ marginLeft: '8px', color: '#808080' }}>
                    {companyBusinessIndustryInfo?.[item.key] || '--'}{' '}
                    {item.unit ? item.unit : null}
                  </span>
                </p>
                <Divider style={{ margin: '-6px 0px 0px 0px' }} />
              </Fragment>
            );
          } else {
            return (
              <p
                key={index}
                style={{
                  color: '	rgba(59,46,126,0.9)',
                  display: 'inline-block',
                  marginTop: '10px',
                  fontWeight: 'bold',
                  textAlign: 'left',
                }}
              >
                {item.value}:
                <span style={{ marginLeft: '8px', color: '#808080' }}>
                  {companyBusinessIndustryInfo?.[item.key] || '--'}
                </span>
              </p>
            );
          }
        })}
      </div>
      {resultGoPublicVO &&
        getTable<ReleaseType, ResultGoPublicVO>(1, resultGoPublicVO, columns)}
      {resultHighTechVO &&
        getTable<TechnologyType, ColumnHighTechVO>(
          2,
          {
            ...resultHighTechVO,
            name: companyBusinessIndustryInfo?.name || '',
          },
          technologyColumns,
        )}
    </div>
  );
};

export default CompanyInfo;

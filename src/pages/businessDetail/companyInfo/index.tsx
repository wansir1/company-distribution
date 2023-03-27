import React, { useState, useEffect, Fragment } from 'react';
import { Typography, Space, Popover, Divider, Table } from 'antd';
import Title from '@/components/Title';
import { businessInfoType, businessInfoList,columns,technologyColumns } from './constants';
import styles from './index.less';
const { Link } = Typography;
const MAX_SPANS = 4;
const businessInfo: businessInfoType = {
  companyName: '青岛特锐德电气股份有限公司',
  registeredCapital: '99757万元人民币',
  address: '青岛市崂山区松岭路336号',
  legalPerson: '于德翔',
  registeredTime: '2004-03-16',
  contactInfo: '电话：027-88888888',
  registrationStatus: '在营（开业）企业',
};
let tagTest: string[] = [
  '电力设备租赁',
  '电力设备制造',
  '设备制造业',
  '设备租赁',
  '电力设备',
  '测试机',
];
let tag : string[] = ['创业板 (300001)','高新技术企业']
const CompanyInfo: React.FC = (props) => {
  const [visible, setVisible] = useState(false);
  const [businessData, setBusinessData] = useState([]);
  const moreSpan = tagTest.slice(MAX_SPANS);
  const content = (
    <div className={styles.spanColor}>
      <Space className={styles.space}>
        {moreSpan.map((item, index) => {
          return <span key={index}>{item}</span>;
        })}
      </Space>
    </div>
  );
  return (
    <div>
      <Title
        text="青岛特锐德电气股份有限公司"
        style={{ marginBottom: '3px' }}
      />
      <div style={{ marginLeft: '8px', fontSize: '8px' }}>
        <span style={{ marginRight: '30px' }}>
          地址:青岛市崂山区松岭路336号
        </span>
        <Link href="http://www.baidu.com" target="_blank">
          网址：www.baidu.com
        </Link>
        <div className={styles.spanColor}>
            <Space className={styles.firstSpace}>
            {tag.map(item => <span key={item+'1'}>{item}</span>)}
            </Space>
          <div className={styles.secondRow}>
            <Space>
              {tagTest.slice(0, MAX_SPANS).map((item, index) => {
                return <span key={index}>{item}</span>;
              })}
              {tagTest.length > MAX_SPANS && (
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
                    {businessInfo[item.key]}
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
                  {businessInfo[item.key]}
                </span>
              </p>
            );
          }
        })}
      </div>
      <Title
        text="上市公司信息"
        style={{ marginBottom: '3px', marginTop: '30px', fontSize: '16px' }}
      />
      <Table
        className="businessTable"
        columns={columns}
        dataSource={[
          {
            board: '创业板',
            stockCode: '300001',
            stockName: '特锐德',
            releaseDate: '2009-10-30',
          },
        ]}
        // loading={loading}
        bordered
        pagination={false}
        size="small"
      />

      <Title
        text="高新技术企业"
        style={{ marginBottom: '3px', marginTop: '30px', fontSize: '16px' }}
      />
      <Table
        className="businessTable"
        columns={technologyColumns}
        dataSource={[
          {
            name: '特锐德电气',
            licenseNumber: '300001',
            identificationDate: '2009-10-30',
            agency: '某某机构',
          },
        ]}
        // loading={loading}
        bordered
        pagination={false}
        size="small"
      />
    </div>
  );
};

export default CompanyInfo;

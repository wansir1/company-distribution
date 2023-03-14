import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Spin, Button, Space, Table } from 'antd';
import Title from '@/components/Title';
import { companyType } from '@/Map/constants';
import { SearchOutlined } from '@ant-design/icons';
import { mapColor } from '@/Map/constants';
import Chart from '@/components/Echart';
import { requestIndustryType, requestCompany } from '@/services/search';
import RenderRow from '@/components/Row';
import SelectSearch, { typeListType } from './selectSearch';
import { columns, firstOption,secondOption,thirdOption } from './constants';
import styles from './index.less';
const { Search } = Input;
const content = [
  {
    label: '相关企业数',
    value: 2735,
    valueStyle: { color: '#13c2c2' },
    unit: '家',
  },
  {
    label: '相关企业专利数量',
    value: 46722,
    style: { top: '14px' },
    valueStyle: { color: '#3436c7' },
    unit: '个',
  },
  {
    label: '相关企业中上市公司数量',
    valueStyle: { color: 'green' },
    style: { top: '24px' },
    value: 119,
    unit: '家',
  },
];
const CompanySearch: React.FC = (props) => {
  const [typeList, setTypeList] = useState<typeListType>([]);
  const [loading, setLoading] = useState(true);
  const [companyList, setCompanyList] = useState<{
    loading: boolean;
    data: companyType[];
  }>({ loading: false, data: [] });
  useEffect(() => {
    getTypeList();
  }, []);

  useEffect(() => {
    getCompanyList();
  }, []);

  const getCompanyList = async () => {
    setCompanyList({loading:true, data:[]});
    const companyList: companyType[] = await requestCompany({ typeId: '1' });
     Array.isArray(companyList) ? setCompanyList({loading:false,data:companyList}) : setCompanyList({loading: false, data:[]});
  }
  const getTypeList = async () => {
    const typeList: typeListType = await requestIndustryType();
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
  console.log({ typeList, loading });
  return (
    <div className={styles.wrapper}>
      <div className={styles.search} style={{ alignItems: 'center' }}>
        <SelectSearch typeList={typeList} />
        <Button type="primary" icon={<SearchOutlined />} />
      </div>
      <Row
        style={{
          position: 'relative',
          height: '575px',
          top: '20px',
          marginLeft: '10px',
        }}
      >
        <Col span={4}>
          <Row gutter={[0, 12]}>
            {content.map((item, index) => (
              <RenderRow content={item} key={index} />
            ))}
          </Row>
          <Row>
            <Col style={{ padding: '6px 4px' }} className={styles.typeBox}>
              <div>
                <span>选中的产业类别：</span>
                <span
                  style={{
                    borderRadius: '3px',
                    padding: '2px 14px',
                    background: '#1890ff',
                    color: '#fff',
                  }}
                >
                  芯片
                </span>
              </div>
              <div style={{ marginTop: '10px' }}>
                <span>所有产业类别：</span>
                {typeList.map((item) => (
                  <span
                    style={{
                      borderRadius: '3px',
                      padding: '2px 14px',
                      background: mapColor[+item.typeId - 1],
                      color: '#fff',
                      margin: '2px',
                      display: 'inline-block',
                    }}
                    key={item.typeId}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <div className={styles.middleBox}>
            <Title text="公司清单" style={{ fontSize: '20px' }} />
            <Table
              className="table"
              columns={columns}
              dataSource={companyList.data}
              loading={companyList.loading}
            />
          </div>
        </Col>
        <Col span={8}>
          <div className={styles.lastBox}>
            <Row>
              <Col span={24}>
                <Chart option={firstOption} style={{ height: '380px' }} />
              </Col>
            </Row>
            {/* <Row>
              <Col span={24}>
                <Chart option={secondOption} style={{ height: '190px' }} />
              </Col>
            </Row> */}
            <Row>
              <Col span={24}>
                <Chart option={thirdOption} style={{ height: '190px' }} />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CompanySearch;

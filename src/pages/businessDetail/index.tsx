import React, { useState, useEffect } from 'react';
import { Row, Col, Spin, Button, Space, Table } from 'antd';
import { CompanyType } from '@/Map/constants';
import { requestCompany } from '@/services/search';
import { columns, RecommendType } from './constants';
import Select from '@/components/Select';
import Info from './companyInfo';
import searchStyles from '../companySearch/index.less';
import styles from './index.less';
const BusinessDetail: React.FC = (props) => {
  //   const [typeList, setTypeList] = useState<TypeListType>([]);
  const [loading, setLoading] = useState(true);
  const [companyList, setCompanyList] = useState<{
    loading: boolean;
    data: CompanyType[];
  }>({ loading: false, data: [] });
  const [recommendList, setRecommendList] = useState<RecommendType[]>([]);
  const [selectValue, setSelectValue] = useState<string>('');

  useEffect(() => {
    getCompanyList();
  }, []);

  const getCompanyList = async () => {
    try {
      const res: CompanyType[] = await requestCompany({});
      console.log(res);
      if (Array.isArray(res)) {
        const list = res.map((item) => {
          return { companyName: item.name, industrialLayout: item.typeName };
        });
        setCompanyList({ loading: false, data: res });
        setRecommendList(list);
      } else {
        setCompanyList({ loading: false, data: [] });
        setRecommendList([]);
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
  const handleChange = (value: string) => {
    setSelectValue(value);
  };
  const handleClick = () => {
    console.log(selectValue, 'k');
  };
  return (
    <div className={searchStyles.wrapper}>
      <div className={searchStyles.search} style={{ alignItems: 'center' }}>
        <Select
          value={selectValue}
          onChange={(e: any) => handleChange(e)}
          options={companyList.data}
          fieldNames={{ label: 'name', value: 'companyId' }}
          handleClick={handleClick}
        />
      </div>
      <Row
        gutter={[8, 0]}
        style={{
          position: 'relative',
          top: '20px',
          marginLeft: '6px',
          marginRight: '6px',
        }}
      >
        <Col span={12}>
          <div className={styles.colBox}>
            <Info />
          </div>
        </Col>
        <Col span={12}>
          <div className={styles.colBox}>
            <span className={styles.span}>潜在竞合公司推荐</span>
            <Table
              className="businessTable"
              columns={columns}
              dataSource={recommendList}
              loading={companyList.loading}
              bordered
              size="middle"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BusinessDetail;

import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Spin, Button, Space, Table } from 'antd';
import { CompanyType } from '@/Map/constants';
import { requestCompany, requestSearchRelation } from '@/services/search';
import { GlobalInfoContext } from '../layouts';
import { GraphType, DataType } from '@/pages/clusterMapping/constants';
import { columns, RecommendType } from './constants';
import Select from '@/components/Select';
import Info from './companyInfo';
import searchStyles from '../companySearch/index.less';
import styles from './index.less';
const BusinessDetail: React.FC = (props) => {
  const { layoutState, setLayoutState } = useContext(GlobalInfoContext);
  const [loading, setLoading] = useState(true);
  const [companyList, setCompanyList] = useState<{
    loading: boolean;
    data: CompanyType[];
  }>({ loading: false, data: [] });
  const [recommendList, setRecommendList] = useState<RecommendType[]>([]);
  const [selectValue, setSelectValue] = useState<string>(layoutState.companyId);

  useEffect(() => {
    getCompanyList();
  }, []);

  useEffect(() => {
    getRelationData();
  }, [layoutState.companyId]);
  const getRelationData = async () => {
    try {
      const res: GraphType = await requestSearchRelation(
        layoutState.companyName,
      );
      if (!('code' in res)) {
        const list = res.data
          .map((item: DataType, index: number) => {
            return {
              companyName: item.name,
              industrialLayout: [res.category[item.category].name],
              serialNumber: index + 1,
              registeredCapital: item.value,
            };
          })
          .sort((a: any, b: any) => b.registeredCapital - a.registeredCapital);

        setRecommendList(list);
      } else {
        setRecommendList([]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getCompanyList = async () => {
    try {
      const res: CompanyType[] = await requestCompany({});
      if (Array.isArray(res)) {
        setCompanyList({ loading: false, data: res });
      } else {
        setCompanyList({ loading: false, data: [] });
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
    if (setLayoutState) {
      const currentCompany = companyList.data.filter(
        (item) => item.companyId === selectValue,
      );
      setLayoutState({
        companyId: selectValue,
        companyName: currentCompany[0].name,
      });
      console.log(currentCompany, 'jjkl');
    }
  };
  return (
    <div className={searchStyles.wrapper}>
      <div className={searchStyles.search} style={{ alignItems: 'center' }}>
        <Select
          value={selectValue}
          onChange={(value: string) => handleChange(value)}
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
            <Info companyId={layoutState.companyId} />
          </div>
        </Col>
        <Col span={12}>
          <div className={styles.colBox}>
            <span className={styles.span}>竞合公司推荐</span>
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

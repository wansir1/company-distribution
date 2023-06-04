import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Spin, Button, Space, Table } from 'antd';
import Title from '@/components/Title';
import { CompanyType } from '@/Map/constants';
import { mapColor } from '@/Map/constants';
import Chart from '@/components/Echart';
import {
  requestIndustryType,
  requestCompany,
  requestIndustryData,
} from '@/services/search';
import RenderRow from '@/components/Row';
import SelectSearch, { TypeListType } from './selectSearch';
import {
  columns,
  getFirstOption,
  IndustryData,
  getThirdOption,
  getIndex,
} from './constants';
import styles from './index.less';

const CompanySearch: React.FC = (props) => {
  const [typeList, setTypeList] = useState<TypeListType>([]);
  const [loading, setLoading] = useState(true);
  const [companyList, setCompanyList] = useState<{
    loading: boolean;
    data: CompanyType[];
  }>({ loading: false, data: [] });
  const [selectValue, setSelectValue] = useState<string[]>([]);
  const [industryData, setIndustryData] = useState<IndustryData | {}>({});
  const {
    relatedEnterpriseNumber,
    relatedPatentsNumber,
    listedCompaniesNumber,
    financingEchart,
    patentEchart,
  } = industryData as IndustryData;
  useEffect(() => {
    getTypeList();
  }, []);

  const getCompanyList = async (params: string[]) => {
    setCompanyList({ loading: true, data: [] });
    try {
      const res: CompanyType[] = await requestCompany({ typeIdList: params });
      Array.isArray(res)
        ? setCompanyList({
            loading: false,
            data: res.sort((a, b) => b.registeredCapital - a.registeredCapital),
          })
        : setCompanyList({ loading: false, data: [] });
      if (params.length === 0) {
        setCompanyList({ loading: false, data: [] });
      }
    } catch (e) {
      setCompanyList({ loading: false, data: [] });
    }
  };
  const getTypeList = async () => {
    try {
      const typeList: TypeListType = await requestIndustryType();
      Array.isArray(typeList) ? setTypeList(typeList) : setTypeList([]);
    } catch (e) {
      console.log(e);
      setTypeList([]);
    }

    setLoading(false);
  };
  const getIndustryData = async (param: string[]) => {
    try {
      const res: IndustryData = await requestIndustryData({
        companyTypeList: param,
      });
      if (!('code' in res)) {
        setIndustryData(res);
      }
      if (param.length === 0) {
        setIndustryData({});
      }
    } catch (e) {
      setIndustryData({});
    }
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
  const handleClick = (selectValue: string[] = []) => {
    const param: string[] = selectValue
      .map((item) => typeList.filter((value) => value.typeId === item))
      .map((item) => item[0].name);
    getCompanyList(selectValue);
    setSelectValue(selectValue);
    getIndustryData(param);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.search} style={{ alignItems: 'center' }}>
        <SelectSearch typeList={typeList} handleClick={handleClick} />
      </div>
      <Row
        style={{
          position: 'relative',
          top: '20px',
          marginLeft: '10px',
        }}
      >
        <Col span={4}>
          <Row gutter={[0, 12]} style={{ height: '42vh' }}>
            {getIndex(
              relatedEnterpriseNumber,
              relatedPatentsNumber,
              listedCompaniesNumber,
            ).map((item, index) => (
              <RenderRow content={item} key={index} />
            ))}
            <Col className={styles.typeBox}>
              <div>
                <span>选中的产业类别：</span>
                {selectValue.map((item) => (
                  <span
                    style={{
                      borderRadius: '3px',
                      padding: '2px 14px',
                      display: 'inline-block',
                      background: mapColor[+item - 1],
                      color: '#fff',
                      margin: '2px',
                    }}
                    key={item}
                  >
                    {typeList.filter((value) => value.typeId === item)[0].name}
                  </span>
                ))}
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
                <Chart
                  option={getFirstOption(financingEchart)}
                  style={{ height: '380px' }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Chart
                  option={getThirdOption(patentEchart)}
                  style={{ height: '190px' }}
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CompanySearch;

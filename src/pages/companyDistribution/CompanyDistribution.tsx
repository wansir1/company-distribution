import styles from './CompanyDistribution.less';
import { Scene, PointLayer } from '@antv/l7';
import {  useSelector } from 'umi';
import React,{ Fragment, useCallback, useEffect,useState } from 'react';
import {Button,Col,Row,Spin} from 'antd';
import CartoonRightBox from '@/components/CartoonRightBox';
import CollapseBox from '@/components/CollapseBox';
import {
  requestCity,
  requestCompany,
  requestIndustryType,
} from '@/services/search';
import {ContentBox} from '@/components/ContentBox';
import {_data,_dataSource} from './constants'
import {
  handleCompanyData,
  companyType,
  deleteMap,
  addMap,
  mapColor,
  addPopupMap,
  popupMap
} from '@/Map/constants';
import SelectSearch, {
  searchListType,
  cityListType,
  typeListType,
} from './components/SelectSearch';
  type mapLayerListType = { type: string; value: string; map: any };
  let mapLayerList: mapLayerListType[] = [
    {
      type: 'search',
      value: 'company',
      map: null,
    },
  ];
const CompanyDistribution: React.FC = () => {
  const { scene, map } = useSelector(
    ({
      map,
    }: {
      map: { map?: AMap.Map | null; loca?: any; scene: Scene };
    }) => ({ ...map }),
  );
    const [findValue, setFindValue] = useState<companyType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchData, setSearchData] = useState<searchListType>({
      cityList: [],
      typeList: [],
      companyList: [],
    });
  useEffect(() => {
    handleDataList();
    return () => {
        scene&&scene.removeAllLayer();
    }
  }, [scene]);
  useEffect(() => {
    console.log(mapLayerList,'kkkkkkkk')
    scene && deleteMap(mapLayerList,'search','company',scene);
    scene && scene.removeAllLayer();
    popupMap && popupMap.remove();
    scene && handleCompanyMap(findValue[0]?.selectType==3,findValue)
  },[findValue])
  const handleCompanyMap = async (isAutoFit:boolean,findValue: companyType[]) => {
    
    const data = {
      type: 'FeatureCollection',
      features: handleCompanyData(findValue),
    };
    const pointLayer = new PointLayer({ autoFit: isAutoFit })
      .source(data)
      .size([10, 10])
      .shape('circle')
      .color('typeName', (val) => {
        const colorIndex = searchData.typeList.findIndex(item => item.name == val[0]);
        console.log(colorIndex,val)
        return mapColor[colorIndex];
      })
      .style({
        stroke: '#447df2',
        strokeWidth:1,
      });
    pointLayer.on('click', (e) => {
        addPopupMap(e.feature.properties,scene,()=>{},[]);
    });
    const mapList = addMap(mapLayerList,'company', pointLayer, scene);
    mapLayerList=[...mapList];
  };

  const handleDataList = async() => {
      const cityList: cityListType = await requestCity('1597867222326329346');
      const typeList: typeListType = await requestIndustryType();
      const companyList: companyType[] = await requestCompany({});
      setSearchData({cityList,typeList,companyList});
      setLoading(false);
  }
     if(loading)
     {
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
        );}
  return (
    <Fragment>
      <div className={styles.leftTopSearchBox}>
        <SelectSearch
          setFindValue={setFindValue}
          dataList={searchData}
          map={map!}
        />
      </div>
      {searchData.typeList.length > 0 && (
        <CartoonRightBox>
          <CollapseBox title="省级分析">
            <ContentBox data={_data} dataSource={_dataSource} />
          </CollapseBox>
          <CollapseBox title="企业类别">
            <Row gutter={8}>
              {searchData.typeList.map((item, index) => {
                return (
                  <Col span={12} key={index}>
                    <span
                      style={{
                        display: 'inline-block',
                        marginRight: 4,
                        borderRadius: 10,
                        width: 10,
                        height: 10,
                        backgroundColor: mapColor[index],
                      }}
                    ></span>
                    {item.name}
                  </Col>
                );
              })}
            </Row>
          </CollapseBox>
        </CartoonRightBox>
      )}
    </Fragment>
  );
};

export default CompanyDistribution;

import styles from './index.less';
import { Scene, PointLayer } from '@antv/l7';
import { Button, Space } from 'antd';
import { useHistory, useModel, useSelector } from 'umi';
import { useCallback, useEffect } from 'react';
import { requestCity, requestCompany } from '@/services/search';
import { handleCompanyData, companyType } from '@/Map/constants';
const IndexPage: React.FC = () => {
  const { scene, map } = useSelector(
    ({
      map,
    }: {
      map: { map?: AMap.Map | null; loca?: any; scene: Scene };
    }) => ({ ...map }),
  );

  const history = useHistory();
  const { initialState } = useModel('@@initialState');
  const { user, singin, singout } = useModel('user');
  type mapLayerListType = { type: string; value: string; map: any };
  const mapLayerList: mapLayerListType = {
    type: 'search',
    value: 'company',
    map: null,
  };
  useCallback(() => {
    console.log('ddd');
  }, [])();
  useEffect(() => {
    console.log('sssssssssss');
    if (scene) {
      handleCityList();
    }
  }, [scene]);

  const handleCityList = async () => {
    const res: companyType[] = await requestCompany({});
    const data = {
      type: 'FeatureCollection',
      features: handleCompanyData(res),
    };
    console.log(data, 'aaa');
    const pointLayer = new PointLayer({autoFit: true,})
      .source(data)
      .size([10, 10])
      .shape('plane')
      .style({
        borderWidth: 0,
        lineTexture: true, // 开启线的贴图功能
        textureBlend: 'replace', // 设置纹理混合方式，默认值为 normal，可选值有 normal/replace 两种
      });
    pointLayer.on('click', (e) => console.log(e));
    scene.addLayer(pointLayer);
    console.log(res, scene, 're');
  };

  return (
    <div>
      {initialState?.id}
      <br />
      {initialState?.name}
      <br />
      {initialState?.passward}
      <br />

      {user?.id}
      <br />
      {user?.name}

      <h1 className={styles.title}>Page index</h1>
      <Space>
        <Button type="primary" onClick={() => singin('wan', '123456')}>
          登录
        </Button>
        <Button type="primary" onClick={() => singout()}>
          {' '}
          登出
        </Button>
      </Space>
      <Button
        type="primary"
        style={{ display: 'block', marginBottom: 10 }}
        onClick={() => history.push('/userInfo')}
      >
        go2UserInfo
      </Button>
      <Button type="primary" onClick={() => history.push('/user')}>
        go2User
      </Button>
    </div>
  );
};

export default IndexPage;

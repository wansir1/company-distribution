import React, { Fragment, useEffect, useState,memo } from 'react';
import { Input,Button } from 'antd';
import styles from './index.less';
const Map: React.FC = (props) => {
  const [map, setMap] = useState();
  const autoOptions = {
        input: 'tipinput',
      };
  useEffect(() => {
    let a = 1;
    var map = new AMap.Map('container', {
      zoom: 10, //级别
      pitch: 60,
      doubleClickZoom: false,
      center: [115.9, 28.68333], //中心点坐标
      mapStyle: 'amap://styles/cb82448d6124b9c5eeceb3130455509e',
      viewMode: '2D', //使用3D视图
      resizeEnable: true,
    });
    var loca = new Loca.Container({
      map,
    });

    var geo = new Loca.GeoJSONSource({
    //   data: [],
      url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/china_traffic_event.json',
    });

    var scatter = new Loca.ScatterLayer({
      // loca,
      zIndex: 10,
      opacity: 1,
      visible: true,
      zooms: [2, 22],
    });


    scatter.setSource(geo, {
      unit: 'px',
      size: [20, 20],
      texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/blue.png',
      borderWidth: 0,
    });
    loca.add(scatter);
    // 呼吸
    var top10 = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            cityName: '韶关市',
            ratio: 0,
            rank: 96,
          },
          geometry: {
            type: 'Point',
            coordinates: [113.58052, 24.760098],
          },
        },
        {
          type: 'Feature',
          properties: {
            cityName: '乐山市',
            ratio: 0,
            rank: 97,
          },
          geometry: {
            type: 'Point',
            coordinates: [103.75082, 29.58099],
          },
        },
        {
          type: 'Feature',
          properties: {
            cityName: '阜阳市',
            ratio: 0,
            rank: 98,
          },
          geometry: {
            type: 'Point',
            coordinates: [115.82654, 32.889915],
          },
        },
        {
          type: 'Feature',
          properties: {
            cityName: '荆门市',
            ratio: 0,
            rank: 99,
          },
          geometry: {
            type: 'Point',
            coordinates: [112.209816, 30.997377],
          },
        },
        {
          type: 'Feature',
          properties: {
            cityName: '哈尔滨市',
            ratio: 0,
            rank: 100,
          },
          geometry: {
            type: 'Point',
            coordinates: [126.61314, 45.746685],
          },
        },
        {
          type: 'Feature',
          properties: {
            cityName: '达州市',
            ratio: 0,
            rank: 101,
          },
          geometry: {
            type: 'Point',
            coordinates: [107.493, 31.205515],
          },
        },
        {
          type: 'Feature',
          properties: {
            cityName: '自贡市',
            ratio: 0,
            rank: 102,
          },
          geometry: {
            type: 'Point',
            coordinates: [104.777824, 29.34555],
          },
        },
        {
          type: 'Feature',
          properties: {
            cityName: '陇南市',
            ratio: 0,
            rank: 103,
          },
          geometry: {
            type: 'Point',
            coordinates: [104.93356, 33.388184],
          },
        },
        {
          type: 'Feature',
          properties: {
            cityName: '南充市',
            ratio: 0,
            rank: 104,
          },
          geometry: {
            type: 'Point',
            coordinates: [106.1188, 30.800997],
          },
        },
        {
          type: 'Feature',
          properties: {
            cityName: '恩施土家族苗族自治州',
            ratio: 0,
            rank: 105,
          },
          geometry: {
            type: 'Point',
            coordinates: [109.48512, 30.298103],
          },
        },
        {
          type: 'Feature',
          properties: {
            cityName: '东华理工大学',
            ratio: 0,
            rank: 5006,
          },
          geometry: {
            type: 'Point',
            coordinates: [115.826553, 28.71785],
            // coordinates: [28.800557, 115.75048],115.890495,
            // 28.656153
          },
        },
      ],
    };
    var breath = new Loca.ScatterLayer({
      zIndex: 121,
    });
    breath.setSource(
      new Loca.GeoJSONSource({
        data: top10,
      }),
    );
    breath.setStyle({
      unit: 'px',
      size: [50, 50],
      texture:
        'https://a.amap.com/Loca/static/loca-v2/demos/images/breath_red.png',
      animate: true,
      duration: 1000,
    });
    loca.add(breath);
    loca.animate.start();
    setMap(map);
    let auto = new AMap.AutoComplete(autoOptions);
    var placeSearch = new AMap.PlaceSearch({
      map: map,
      autoFitView: true,
      panel: 'panel',
    }); //构造地点查询类
    const select = (e: any) => {
      console.log(e, 'e');
      placeSearch.setCity(e.poi.adcode);
      placeSearch.search(e.poi.name); //关键字查询查询
    };
    auto.on('select', select); //注册监听，当选中某条记录时会触发
    
          map.on('click', (e:any) => {
            const feat = scatter.queryFeature(e.pixel.toArray());
            console.log(e.pixel);
            if (feat) {
              //           map.setCenter([e.lnglat.getLng(),e.lnglat.getLat()]); //设置地图中心点
              //         map.setZoom(zoom); //设置地图层级
              map.setZoomAndCenter(9, [e.lnglat.getLng(), e.lnglat.getLat()]); //同时设置地图层级与中心点
              map.setFitView();
            }
          });
  }, []);

  const handleClick = () => {
    map.clearMap();
  }
  return (
    <Fragment>
      <div id="container" className={styles.container}></div>
      <Input placeholder="请输入关键字" id="tipinput" />
      <Button type="primary" onClick={handleClick}>
        删除marker
      </Button>
      <div id="panel" className={styles.panel}></div>
    </Fragment>
  );
};
export default Map;

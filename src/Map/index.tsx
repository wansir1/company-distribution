import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'umi';
import { Scene } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import { drawBounds } from './constants';
import './index.less';

const Map = () => {
  const dispatch = useDispatch();
  const mapRef = useRef<AMap.Map | null>();
  const locaRef = useRef(null);
  const sceneRef = useRef<Scene | null>(null);
  useEffect(() => {
    mapRef.current = new AMap.Map('mapContainer', {
      zoom: 10,
      pitch: 60,
      center: [115.9, 28.68333], //中心点坐标
      viewMode: '2D',
      // center: [120.20000,30.26667],
      // center: [120.112625, 30.200854],
      doubleClickZoom: false,
      mapStyle: 'amap://styles/cb82448d6124b9c5eeceb3130455509e',
    });
    locaRef.current = new Loca.Container({ map: mapRef.current });
    sceneRef.current = new Scene({
      id: 'mapContainer',
      map: new GaodeMap({
        mapInstance: mapRef.current,
      }),
    });
     sceneRef.current.addImage(
       'plane',
       'https://a.amap.com/Loca/static/loca-v2/demos/images/blue.png',
     );
     
    dispatch({
      type: 'map/save',
      payload: {
        map: mapRef.current,
        loca: locaRef.current,
        scene: sceneRef.current,
      },
    });
    // drawBounds({map: mapRef.current});
    return () => {
      mapRef.current = null;
    };
  }, []);


  return <div id="mapContainer" />;
};

export default Map;

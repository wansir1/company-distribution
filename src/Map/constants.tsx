import { Scene, Popup } from '@antv/l7';
import PopupDataBox from '@/components/PopupDataBox';
import ReactDOMServer from 'react-dom/server';

export const drawBounds = ({
  searchName = '江西',
  level = 'province',
  map,
}: {
  searchName?: string;
  level?: string;
  map: AMap.Map;
}) => {
  // searchName 画边界的对象名如：上海   level: 就是被画对象的等级  分为 province、city、district
  //加载行政区划插件
  //实例化DistrictSearch
  let district = null;
  let polygons: AMap.Polygon<any>[] = [];
  var opts = {
    subdistrict: 0, //获取边界不需要返回下级行政区
    extensions: 'all', //返回行政区边界坐标组等具体信息
    level: level, //查询行政级别
  };
  district = new AMap.DistrictSearch(opts);
  //行政区查询
  district.setLevel(level);
  district.search(searchName, function (status: any, result: any) {
    map?.remove(polygons); //清除上次结果
    polygons = [];
    var bounds = result?.districtList[0]?.boundaries;
    console.log(result,'ggggg');
    if (bounds && bounds.length) {
      for (var i = 0, h = bounds.length; i < h; i++) {
        //生成行政区划polygon
        var polygon = new AMap.Polygon({
          strokeWeight: 1,
          path: bounds[i],
          fillOpacity: 0,
          bubble: true,
          strokeColor: '#FF0000',
          strokeStyle: 'dashed',
        });
        polygons.push(polygon);
      }
    }
    map.add(polygons);
    map.setFitView(polygons); //视口自适应
  });
};

type mapLayerListType = {type: string,value: string, map: any};

// 清除popup
// export const removePopupFun = (scene:Scene) => {
//   const list = scene.popupService.popups || [];
//   if (list && list.length > 0) {
//     for (let i = 0; i < list.length; i++) {
//       list[i].remove();
//     }
//   }
// };

// 清除所有图层
export const removeMap = (scene:Scene) => {
//   scene && removePopupFun(scene);
  scene && scene.removeAllLayer();
};

// 添加图层
export const addMap = (list:mapLayerListType[], value:string, map:any, scene:Scene) => {
  if (!map) return list;
  const mapList = list.map((item) => {
    if (item.value === value) {
      return { ...item, map };
    } else {
      return item;
    }
  });
  if (Array.isArray(map)) {
    map.forEach((v) => {
      scene.addLayer(v);
    });
  } else {
    scene.addLayer(map);
  }
  return mapList;
};

// 清除图层
export const deleteMap = (list:mapLayerListType[], type:string, value:string, scene:Scene) => {
  const mapList = list.map((item) => {
    if (item.type === type && item.value === value) {
      if (Array.isArray(item.map)) {
        item.map.forEach((v) => {
          v && scene.removeLayer(v);
        });
      } else {
        item.map && scene.removeLayer(item.map);
      }
      return { ...item, map: null };
    } else {
      return item;
    }
  });
  return mapList;
};

//  清除type 图层
export const deleteAllMap = (list:mapLayerListType[], type:string, scene:Scene) => {
  const mapList = list.map((item) => {
    if (type === 'all' && item.map) {
      if (Array.isArray(item.map)) {
        item.map.forEach((v) => {
          v && scene.removeLayer(v);
        });
      } else {
        scene.removeLayer(item.map);
      }
      return { ...item, map: '' };
    }
    if (item.type === type && item.map) {
      if (Array.isArray(item.map)) {
        item.map.forEach((v) => {
          v && scene.removeLayer(v);
        });
      } else {
        scene.removeLayer(item.map);
      }
      return { ...item, map: '' };
    }
    return item;
  });
  return mapList;
};

// 获取type是否存在图层
export const getSelectedData = (arr:mapLayerListType[], type:string) => {
  if (!type) return [];
  const list: string[] = [];
  arr.forEach((v) => {
    if (v.type === type && v.map) {
      list.push(v.value);
    }
  });
  return list;
};

// 处理数据
export type companyType = {
  address: string;
  cityName: string;
  companyId: string;
  districtName: string;
  latitude: string;
  longitude: string;
  name: string;
  provinceName: string;
  registeredCapital: number;
  typeName: string[];
  selectType?: number;
};
export type siteDataType =
 {
  type: string;
  properties: {
    address: string;
    cityName: string;
    companyId: string;
    districtName: string;
    latitude: string;
    longitude: string;
    name: string;
    provinceName: string;
  };
  geometry: {
    type: string;
    coordinates: number[];
  };
};

// 处理公司数据
export const handleCompanyData = (arr:companyType[]) => {
  if (!arr) return [];
  const siteData:siteDataType[] = [];
  arr.map((i) => {
    const siteObj = {
      type: 'Feature',
      properties: {
        address: i.address,
        cityName: i.cityName,
        companyId: i.companyId,
        districtName: i.districtName,
        latitude: i.latitude,
        longitude: i.longitude,
        name: i.name,
        typeName: i.typeName,
        registeredCapital: i.registeredCapital,
        provinceName: i.provinceName,
      },
      geometry: {
        type: 'Point',
        coordinates: [Number(i.longitude), Number(i.latitude)],
      },
    };
    siteData.push(siteObj);
  });
  return siteData;
};


// Popup
export const renderPopupMap = (info:any = {}, option:{offsets?:[number,number],closeButton?:boolean,maxWidth?: string} = {}) => {
  const { lngLat, ...cfg } = info;
  console.log({info})
  const { offsets = [0, 0], closeButton = false, maxWidth = '406px' } = option;
  const box = <PopupDataBox {...cfg} />;
  const html = ReactDOMServer.renderToString(box);
  const popup = new Popup({
    offsets,
    closeButton,
    maxWidth,
    stopPropagation: false,
  })
    .setLnglat(lngLat)
    .setHTML(html);

  return popup;
};

export const mapColor = [
  '#1890ff',
  '#facc14',
  '#223273',
  '#2fc25b',
  '#8543e0',
  '#13c2c2',
  '#3436c7',
  '#f04864',
  '#748AE5',
  '#E6965C',
  '#FA2020',
  '#F08BB4',
  '#FC9C04',
];



export let popupMap:any = null;
const popupClick = (e:any, scene:Scene, callback:()=>void, optionList:any[] = []) => {
  const event = e || window.event;
  const target = event.target || event.srcElement;
  const className = target.className;
  if (className === 'hz-icon-close') {
    popupMap && popupMap.remove();
  }
  if (className === 'hz-button') {
    popupMap && popupMap.remove();
    // callback && callback({ ...target.dataset, optionList });
  }
};

// 弹框
export const addPopupMap = (info:any, scene:Scene, callback:() => void, optionList:any) => {
  const popup = renderPopupMap({
    title: info.name,
    data: [info],
    lngLat: {lng:info.longitude,lat:info.latitude},
    id: info.companyId,
    type: 'company',
  });

  popupMap = popup;
  scene.addPopup(popup);
  scene.setCenter([info.longitude, info.latitude]);
  const hzPopupBox = document.getElementById('hzPopupBox');
  if (hzPopupBox) {
    hzPopupBox.onclick = (e) => popupClick(e, scene, callback, optionList);
  }
};
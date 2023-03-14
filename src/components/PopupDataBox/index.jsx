import React, { Fragment } from 'react';
import popupClose from '@/assets/images/popup11.png';
import popupIcon from '@/assets/images/popup22.png';

const PopupDataBox = ({ title = '', data = [], ...props }) => {
  const info = {};
  Object.keys(props || {}).forEach((item) => {
    info[`data-${item}`] = props[item];
  });
  return (
    <div className="hz-popup-box" id="hzPopupBox">
      <div className="hz-popup-title">
        <div style={{ fontWeight: 'bold' }}>公司：{title}</div>
        <img className="hz-icon-close" src={popupClose} />
      </div>
      {data &&
        data.length > 0 &&
        data.map((v) => (
          <Fragment>
            <div className="hz-popup-data" key={v.name}>
              <div style={{ fontWeight: 'bold' }}>
                地址：{v.cityName}
                {v.cityName == v.districtName ? '' : v.districtName}
                {v.address}
              </div>
            </div>
            <div className="hz-popup-data" key={v.name}>
              <div style={{ fontWeight: 'bold' }}>
                企业类型：{v.typeName.reduce((pre, cur) => pre + cur + ' ', '')}
              </div>
              <div style={{ fontWeight: 'bold',flex:1, textAlign: 'right' }}>
                注册资本：{v.registeredCapital} 万
              </div>
            </div>
          </Fragment>
        ))}
      <div className="hz-button" {...info}>
        <img src={popupIcon} />
        前往深入分析
      </div>
    </div>
  );
};

export default PopupDataBox;

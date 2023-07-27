import React from 'react';
import { Tooltip } from 'antd';
import annotation from '@/assets/images/annotation.png';

const Tip = ({ title, content: text, imgList, style: styles, imgStyle }) => {
  const style = {
    width: '200px',
    fontSize: '14px',
    overflowY: 'auto',
    ...styles,
  };

  const content = (
    <div style={{ lineHeight: '20px', color: '#fefefe' }}>
      {text.split('<br />').map((item) => (
        <div key={item}>{item}</div>
      ))}
      {imgList
        ? imgList.map((item) => (
            <img
              src={item}
              key={item}
              alt=""
              style={{ width: '100%', padding: '4px' }}
            />
          ))
        : ''}
    </div>
  );

  return (
    <span>
      {title || ''}
      <Tooltip title={content} overlayInnerStyle={style}>
        <img
          style={{
            width: '14px',
            cursor: 'pointer',
            margin: '0 2px',
            ...imgStyle,
          }}
          src={annotation}
          alt=""
        />
      </Tooltip>
    </span>
  );
};

export default Tip;

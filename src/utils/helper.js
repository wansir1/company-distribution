import { useEffect, useState, useCallback } from 'react';
import { passengerLegend } from '@/utils/contants';

export const renderColumns = (columns) => {
  return columns.map((item) => {
    return {
      title: item.name,
      key: item.key,
      dataIndex: item.key,
      ellipsis: true,
      ...item,
    };
  });
};

export const isNumber = (num) => typeof num === 'number';

export const handleSum = (_num1, _num2) => {
  const num1 = _num1 ? Number(_num1) : null;
  const num2 = _num2 ? Number(_num2) : null;

  if (isNumber(num1) && isNumber(num2)) {
    return num1 + num2;
  }
  if (isNumber(num1) && !isNumber(num2)) {
    return num1;
  }
  if (!isNumber(num1) && isNumber(num2)) {
    return num2;
  }
  if (!isNumber(num1) && !isNumber(num2)) {
    return null;
  }
};

export const handleMarkerColor = (num, data) => {
  let color = '#fff';
  const _data = data || passengerLegend;
  if (!num) return _data[_data.length - 1].color;
  _data.some((item) => {
    if (num >= item.min && num < item.max) {
      color = item.color;
      return true;
    }
  });
  return color;
};

export const handleLineWidth = (num, data) => {
  let width = 2;
  if (!num) return width;
  data.some((item) => {
    if (num >= item.min && num < item.max) {
      width = item.width;
      return true;
    }
  });
  return width;
};

export const useSyncCallback = (callback) => {
  const [proxyState, setProxyState] = useState({ current: false });

  const Func = useCallback(() => {
    setProxyState({ current: true });
  }, [proxyState]);

  useEffect(() => {
    if (proxyState.current === true) setProxyState({ current: false });
    console.log('1');
  }, [proxyState]);

  useEffect(() => {
    console.log('2');
    proxyState.current && callback();
  });

  return Func;
};

export function createIcon(color, size) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = size;
  canvas.height = size;

  ctx.beginPath();
  ctx.fillStyle = color;

  // 圆形
  ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);

  ctx.closePath();
  ctx.fill();

  return canvas.toDataURL();
}

export const setPortTime = (timeRange) => {
  return timeRange < 10 ? `0${timeRange}:00` : `${timeRange}:00`;
};

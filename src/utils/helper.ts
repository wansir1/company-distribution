import { useEffect, useState, useCallback } from 'react';
import { message } from 'antd/es';
import { history } from 'umi';
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
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const handleLogout = async () => {
  localStorage.clear();
  await waitTime(500);
  message.success('退出成功');
  history.push('/home');
};

export const isNotEmptyObj = <T extends {}>(value: {} | T): value is T => {
  return Object.keys(value).length !== 0;
};

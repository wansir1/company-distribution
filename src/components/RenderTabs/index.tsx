import { Tabs } from 'antd';
import type { Tab } from 'rc-tabs/lib/interface';
import React from 'react';

 type PropsType = {
    items: Tab[],
    callback?: (e:any) => void,
 }

const RenderTabs: React.FC<PropsType> = ({items, callback}) => {
  const tabBarStyles = { color: ' #8C8C8C', fontSize: '14px' };
  return (
    <Tabs
      items={items}
      tabBarStyle={tabBarStyles}
      onChange={(e) => callback && callback(e)}
    />
  );
};

export default RenderTabs;

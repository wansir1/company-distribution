import React, { useState, useEffect } from 'react';
import { Collapse } from 'antd';
import CollapseTitleBox from '../CollapseTitleBox';

// import styles from './index.less';

const { Panel } = Collapse;

const CollapseBox = ({ title, children }) => {
  return (
    <Collapse ghost expandIconPosition="end" defaultActiveKey={['1']}>
      <Panel header={<CollapseTitleBox title={title} />} key="1">
        {children}
      </Panel>
    </Collapse>
  );
};

export default CollapseBox;

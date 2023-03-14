import React from 'react';
import { Collapse } from 'antd';
import icon from '../../assets/images/多层.png';

import styles from './index.less';

const { Panel } = Collapse;

const CollapseTitleBox = ({ title }) => {
  return (
    <div className={styles.collapseTitleBox}>
      <img className={styles.imgBox} src={icon} />
      <div className={styles.titleBox}>{title}</div>
    </div>
  );
};

export default CollapseTitleBox;

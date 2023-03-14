import React from 'react';
import { Divider } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Title from '../Title';
import styles from './index.less';

const DetailModal = ({
  title,
  onClose,
  children,
  style = {},
  bottom,
  rightExtra,
}) => {
  return (
    <div
      className={bottom ? styles.bottomWrapper : styles.wrapper}
      style={style}
    >
      {typeof title === 'function' ? (
        title()
      ) : (
        <Title text={title} type="small" />
      )}
      {rightExtra ? (
        <span className={styles.rightExtra}> {rightExtra}</span>
      ) : (
        ''
      )}
      <CloseOutlined className={styles.icon} onClick={onClose} />
      <Divider style={{ marginBottom: 12, marginTop: 12 }} />
      {children}
    </div>
  );
};

export default DetailModal;

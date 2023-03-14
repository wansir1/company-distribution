import React, { useState } from 'react';
import { Drawer } from 'antd';

import charge from '@/assets/images/收起.png';
import charge2 from '@/assets/images/展开.png';

import styles from './index.less';

const CartoonRightBox = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [state, setState] = useState('');

  const iconClick = () => {
    if (open) {
      setState('charge');
    } else {
      setState('closed');
    }
    setOpen(!open);
  };
  return (
    <div className={styles.busRightBox}>
      <img
        src={open ? charge : charge2}
        className={`${styles.busIcon} ${
          state === 'charge' ? styles.busCharge : ''
        } ${state === 'closed' ? styles.busClosed : ''}`}
        onClick={iconClick}
      />
      <Drawer
        placement="right"
        closable={false}
        onClose={() => setOpen(false)}
        open={open}
        maskClosable={false}
        width="466px"
        getContainer={false}
        style={{ position: 'absolute' }}
      >
        <div className={styles.drawerBox}>{children}</div>
      </Drawer>
    </div>
  );
};

export default CartoonRightBox;

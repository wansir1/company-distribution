import React, { useState, useEffect, Fragment } from 'react';
import { Select as AntSelect, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './index.less';

const Select: React.FC<any> = (props) => {
  const { divStyles, selectStyles, handleClick } = props;
  return (
    <div className={styles.wrapper} style={divStyles}>
      <div className={styles.inputSearch}>
        <AntSelect
          showSearch
          allowClear
          placeholder="请输入"
          optionFilterProp={'name'}
          fieldNames={{ label: 'name', value: 'typeId' }}
          {...props}
        />
      </div>
      <Button type="primary" icon={<SearchOutlined />} onClick={handleClick} />
    </div>
  );
};

export default Select;

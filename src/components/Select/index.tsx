import React, { useState, useEffect, Fragment } from 'react';
import { Select as AntSelect } from 'antd';
import styles from './index.less';

const Select: React.FC<any> = (props) => {
    const {divStyles, selectStyles} = props;
  return (
    <Fragment>
      <div className={styles.inputSearch} style={divStyles} >
        <AntSelect
          showSearch
          allowClear
          placeholder="请输入"
          optionFilterProp={'name'}
          fieldNames={{ label: 'name', value: 'typeId' }}
          {...props}
        />
      </div>
    </Fragment>
  );
};

export default Select;

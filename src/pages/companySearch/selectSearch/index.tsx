import React, { useState, useEffect, Fragment } from 'react';
import { Select,Tag } from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import styles from './index.less';
import {
  mapColor,
} from '@/Map/constants';
export type typeListType = { typeId: string; name: string }[];
export type searchListType = {
  typeList: typeListType;
};
type PropsType = {
  typeList: typeListType;
};
const SelectSearch: React.FC<PropsType> = (props) => {
  const [searchValue, setSearchValue] = useState<string[]>([]);
  const {  typeList } = props;
  console.log({typeList})
  const [searchList, setSearchList] = useState<typeListType>(typeList);
  const handleChange = (value: string[]) => {
        setSearchValue(value);
  };
  useEffect(()=>{
    setSearchList(typeList);
  },[typeList])
const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={mapColor[value - 1]}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};
  return (
    <Fragment>
      <div className={styles.inputSearch}>
        <Select
          {...props}
          mode="multiple"
          value={searchValue}
          tagRender={tagRender}
          onChange={(e) => handleChange(e)}
          showSearch
          allowClear
          placeholder="请选择类型"
          options={searchList}
          optionFilterProp={'name'}
          fieldNames={{ label: 'name', value: 'typeId' }}
          maxTagCount= 'responsive'
        />
      </div>
    </Fragment>
  );
};

export default SelectSearch;

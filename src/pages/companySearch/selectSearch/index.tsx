import React, { useState, useEffect, Fragment } from 'react';
import { Tag } from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { mapColor } from '@/Map/constants';
import Select from '@/components/Select';
export type TypeListType = { typeId: string; name: string }[];
export type SearchListType = {
  typeList: TypeListType;
};
type PropsType = {
  typeList: TypeListType;
  handleClick: any;
  single?: boolean;
};
const SelectSearch: React.FC<PropsType> = (props) => {
  const [searchValue, setSearchValue] = useState<string[]>([]);
  const { typeList, single = false, handleClick } = props;
  const [searchList, setSearchList] = useState<TypeListType>(typeList);
  const handleChange = (value: string[]) => {
    setSearchValue(value);
  };
  useEffect(() => {
    setSearchList(typeList);
  }, [typeList]);
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
    <Select
      mode={single ? '' : 'multiple'}
      value={searchValue}
      tagRender={tagRender}
      onChange={(e: any) => handleChange(e)}
      placeholder="请选择类型"
      options={searchList}
      optionFilterProp={'name'}
      fieldNames={{ label: 'name', value: 'typeId' }}
      maxTagCount="responsive"
      {...props}
      handleClick={() => {
        handleClick(searchValue);
      }}
    />
  );
};

export default SelectSearch;

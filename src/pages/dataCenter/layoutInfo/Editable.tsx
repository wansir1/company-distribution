import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useState } from 'react';
import { convertToArray, ColumnType } from './constants';
import { history } from 'umi';
import { UserInfo } from '@/pages/centralAdministration';
import { requestUpdateIndustryLayout } from '@/services/search';
interface ParamType {
  userInfo: UserInfo;
}
export default (params: ParamType) => {
  const { userInfo } = params;
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly ColumnType[]>([]);

  const columns: ProColumns<ColumnType>[] = [
    {
      title: '产业名称',
      dataIndex: 'name',
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueEnum: new Map([
        [0, '业务'],
        [1, '技术'],
        [2, '产业布局'],
      ]),
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 250,
      render: () => {
        return null;
      },
    },
  ];

  return (
    <EditableProTable<ColumnType>
      headerTitle="添加数据"
      columns={columns}
      rowKey="id"
      scroll={{
        x: 960,
      }}
      value={dataSource}
      onChange={setDataSource}
      recordCreatorProps={{
        newRecordType: 'dataSource',
        record: () => ({
          id: Date.now(),
          name: '',
          type: 0,
        }),
      }}
      toolBarRender={() => {
        return [
          <Button
            type="primary"
            key="save"
            onClick={() => {
              // dataSource 就是当前数据，可以调用 api 将其保存
              console.log(dataSource);
              setDataSource([]);
            }}
          >
            清空表格
          </Button>,
        ];
      }}
      editable={{
        type: 'multiple',
        editableKeys,
        saveText: '添加',
        onSave: async (key, row, originRow) => {
          console.log(key, row, originRow);

          row.type = Number(row.type);

          try {
            const data = await requestUpdateIndustryLayout({
              ...row,
              companyId: userInfo.companyId,
            });
            if (typeof data === 'object' && 'code' in data) {
              message.error('token失效请重新登录');
              localStorage.clear();
              history.push(`/home`);
            } else {
              message.success('添加成功');
            }
          } catch (e) {
            message.error('添加失败,系统修复中');
            console.log(e);
          }
        },
        actionRender: (row, config, defaultDoms) => {
          return [defaultDoms.save, defaultDoms.delete];
        },
        onValuesChange: (record, recordList) => {
          setDataSource(recordList);
        },
        onChange: setEditableRowKeys,
      }}
    />
  );
};

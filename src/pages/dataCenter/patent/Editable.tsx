import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useState } from 'react';
import { convertToArray, ColumnType } from './constants';
import { history } from 'umi';
import { UserInfo } from '@/pages/centralAdministration';
import { requestUpdatePatent } from '@/services/admin';
interface ParamType {
  userInfo: UserInfo;
}
export default (params: ParamType) => {
  const { userInfo } = params;
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly ColumnType[]>([]);

  const columns: ProColumns<ColumnType>[] = [
    {
      title: '专利名称',
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
      title: '专利类型',
      dataIndex: 'type',
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
      title: '专利状态',
      dataIndex: 'state',
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
      title: '发明人',
      dataIndex: 'inventor',
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
      title: '申请人',
      dataIndex: 'applicant',
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
      title: '申请号',
      dataIndex: 'applicationNumber',
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
      title: '申请日',
      dataIndex: 'applicationTime',
      valueType: 'date',
      sorter: true,
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
      title: '公开号',
      dataIndex: 'publicNumber',
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
      title: '公开日',
      dataIndex: 'publicTime',
      valueType: 'date',
      sorter: true,
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
      // width: 250,
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
          type: '',
          state: '',
          inventor: '',
          applicant: '',
          applicationNumber: '',
          applicationTime: '2000-1-1',
          publicNumber: '',
          publicTime: '2000-1-1',
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

          try {
            const data = await requestUpdatePatent({
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

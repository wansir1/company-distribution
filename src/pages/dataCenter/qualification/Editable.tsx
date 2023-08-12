import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import { convertToArray, ColumnType } from './constants';
import { UserInfo } from '@/pages/centralAdministration';
import { requestUpdateQualification } from '@/services/search';
interface ParamType {
  userInfo: UserInfo;
}
export default (params: ParamType) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly ColumnType[]>([]);
  const { userInfo } = params;
  const columns: ProColumns<ColumnType>[] = [
    {
      title: '资质名称',
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
      title: '资质类型',
      dataIndex: 'type',
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: false,
            // message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '许可证号',
      dataIndex: 'number',
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
      title: '发证日期',
      dataIndex: 'issuingTime',
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
      title: '截止日期',
      dataIndex: 'closingTime',
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
          type: '',
          number: '',
          issuingTime: '2000-1-1',
          closingTime: '2000-1-1',
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
          // const newCompanyId:number = Number(userInfo.companyId);
          try {
            const data = await requestUpdateQualification({
              ...row,
              companyId: userInfo.companyId,
            });
            console.log(data, ' 测试传参数');
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

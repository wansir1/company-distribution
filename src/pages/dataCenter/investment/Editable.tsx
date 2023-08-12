import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useState } from 'react';
import { convertToArray, ColumnType } from './constants';
import { history } from 'umi';
import { UserInfo } from '@/pages/centralAdministration';
import { requestUpdateInvestment } from '@/services/search';
interface ParamType {
  userInfo: UserInfo;
}
const Editable = (params: ParamType) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly ColumnType[]>([]);
  const { userInfo } = params;
  const columns: ProColumns<ColumnType>[] = [
    {
      title: '公司名称',
      dataIndex: 'name',
      ellipsis: true,
      tip: '公司名过长会自动收缩',
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
      title: '持股比例（%）',
      dataIndex: 'ratio',
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
          {
            pattern: /^(100(\.0+)?|[1-9]?\d(\.\d+)?)$/,
            message: '请输入大于等于0小于等于100的数字',
          },
        ],
      },
    },
    {
      title: '出资金额（万）',
      dataIndex: 'amount',
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
      title: '技术/业务',
      dataIndex: 'business',
      ellipsis: true,
      tip: '相互之间以英文逗号隔开',
      formItemProps: {
        rules: [
          {
            pattern:
              /^([\u4E00-\u9FA5a-zA-Z1-9]+)(,[\u4E00-\u9FA5a-zA-Z1-9]+)*$/,
            message: '请输入技术或业务名称，并以英文逗号隔开',
          },
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
          amount: 0,
          ratio: 0,
          business: [''],
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
          row.business =
            typeof row.business === 'string'
              ? convertToArray(row.business)
              : row.business;
          row.amount = Number(row.amount);
          row.ratio = Number(row.ratio) / 100; //这里不处理是因为row.name为string，而定义的类型也为string所以不需要处理
          console.log(key, row, originRow); //查看处理后的数据是否符合传给后端的类型数据，符合则通过接口把res传给接口
          try {
            const data = await requestUpdateInvestment({
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

export default Editable;

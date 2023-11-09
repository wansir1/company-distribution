import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Button, message, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import {
  convertToArray,
  ColumnType,
  checkRuler,
  YEAR_NUMBER,
  YEAR_MOUTH_NUMBER,
} from './constants';
import { history } from 'umi';
import { UserInfo } from '@/pages/centralAdministration';
import { getCompanyList, ApiFunctions } from '../constants';
import { requestSavePredictionInfo } from '@/services/admin';
interface ParamType {
  userInfo: UserInfo;
}

let error = false;
const Editable = (params: ParamType) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly ColumnType[]>([]);
  const { userInfo } = params;
  const columns: ProColumns<ColumnType>[] = [
    {
      title: '预测内容',
      dataIndex: 'name',
      ellipsis: true,
      search: false,
      fixed: 'left',
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
      title: 'x轴值',
      dataIndex: 'data1',
      //copyable: true,
      search: false,
      ellipsis: true,
      tip: '相互之间以英文逗号隔开，x轴值与y轴值数量需相等',
      formItemProps: {
        rules: [
          {
            pattern:
              /^(?:[1-9]\d{3}(?:,[1-9]\d{3})*|[1-9]\d{5}(?:,[1-9]\d{5})*)$/,
            message:
              '请输入全为四位数或六位数的数字序列，且以英文逗号隔开，每个数字不能以0开头',
          },
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      render: (_, record) => (
        <Space style={{ flexWrap: 'wrap' }}>
          {Array.isArray(record.data1) && record.data1}
        </Space>
      ),
    },
    {
      title: 'y轴值',
      dataIndex: 'data2',
      // copyable: true,
      search: false,
      ellipsis: true,
      tip: '相互之间以英文逗号隔开，x轴值与y轴值数量需相等',
      formItemProps: {
        rules: [
          {
            pattern: /^\d+(,\d+)*$/,
            message: '请输入一个数字序列，以英文逗号隔开',
          },
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      render: (_, record) => (
        <Space style={{ flexWrap: 'wrap' }}>
          {Array.isArray(record.data2) && record.data2}
        </Space>
      ),
    },
    {
      title: '单位',
      dataIndex: 'units',
      ellipsis: true,
      search: false,
      width: 150,
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
      width: 150,
      render: () => {
        return null;
      },
    },
  ];

  useEffect(() => {
    console.log(dataSource, 'datasource123');
  }, [dataSource]);

  return (
    <EditableProTable<ColumnType>
      headerTitle="添加数据"
      scroll={{
        x: 'max-content',
      }}
      columns={columns}
      rowKey="id"
      value={dataSource}
      onChange={(e) => {
        if (error) {
          setDataSource(e.slice(0, -1));
          error = false;
        } else {
          setDataSource(e);
        }
      }}
      recordCreatorProps={{
        newRecordType: 'dataSource',
        record: () => ({
          id: Date.now(),
          name: '',
          data1: [],
          data2: [],
          units: '',
        }),
      }}
      toolBarRender={() => {
        return [
          <Button
            type="primary"
            key="save"
            onClick={() => {
              // dataSource 就是当前数据，可以调用 api 将其保存
              console.log(dataSource, 'datasourec');
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
          console.log(key, row, originRow, '1111');

          row.data1 =
            typeof row.data1 === 'string'
              ? convertToArray(row.data1)
              : row.data1;
          row.data2 =
            typeof row.data2 === 'string'
              ? convertToArray(row.data2)
              : row.data2;
          if (row.data1.length < 3 || row.data1.length != row.data2.length) {
            message.error(
              '添加失败,x轴值数量应当与y轴值数量相同,且都不少于3个及3个以上数据',
            );
            error = true;
            return;
          }
          if (
            !checkRuler(
              row.data1,
              row.data1[0].toString().length === 4
                ? YEAR_NUMBER
                : YEAR_MOUTH_NUMBER,
            )
          ) {
            error = true;
            return;
          }
          try {
            const data = await requestSavePredictionInfo({
              ...row,
              companyId: userInfo.companyId,
            });
            if (typeof data === 'object' && 'code' in data) {
              message.error('添加失败');
            } else {
              message.success('添加成功');
            }
          } catch (e) {
            message.error('添加失败');
            console.log(e);
          }
          // try {
          //   const data = await requestUpdate(row);
          //   console.log(data, ' 测试传参数');
          //   if (typeof data === 'object' && 'code' in data) {
          //     message.error('token失效请重新登录');
          //     localStorage.clear();
          //     history.push(`/home`);
          //   } else {
          //     message.success('添加成功');
          //   }
          // } catch (e) {
          //   message.error('添加失败,系统修复中');
          //   console.log(e);
          // }
        },
        actionRender: (row, config, defaultDoms) => {
          return [defaultDoms.save, defaultDoms.delete];
        },
        // onValuesChange: (record, recordList) => {
        //
        //   setDataSource(recordList);
        // },
        onChange: setEditableRowKeys,
      }}
    />
  );
};

export default Editable;

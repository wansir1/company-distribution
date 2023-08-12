import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, ProCard } from '@ant-design/pro-components';
import { Space, Tag, message } from 'antd';
import React, { useContext, useRef } from 'react';
import { AdminInfoContext } from '@/pages/centralAdministration';
import { dataTest, ColumnType, SearchUserType, roleColor } from './constants';
import styles from './index.less';
import {
  requestDeleteUser,
  requestUpdateUser,
  requestUser,
} from '@/services/search';
import { history } from '@@/core/history';

const PAGE_SIZE = 5;
const columns: ProColumns<ColumnType & { indexNum: number }>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    search: false,
    editable: false,
    width: 48,
    render: (_, record) => {
      const bgColor =
        record.indexNum % PAGE_SIZE > 3 || record.indexNum % PAGE_SIZE === 0
          ? { backgroundColor: '#979797' }
          : {};
      return (
        <div className={styles.index} style={bgColor}>
          {record.indexNum}
        </div>
      );
    },
  },
  {
    title: '所属公司',
    dataIndex: 'companyName',
    // copyable: true,
    search: false,
    editable: false,
    ellipsis: true,
    tip: '公司名过长会自动收缩',
  },
  {
    title: '昵称',
    dataIndex: 'name',
    // copyable: true,
    ellipsis: true,
    tip: '昵称过长会自动收缩',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    ellipsis: true,
    editable: false,
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
    disable: true,
    title: '状态',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    valueType: 'select',
    valueEnum: {
      0: {
        text: '未通过',
        status: 'Error',
      },
      1: {
        text: '审核中',
        status: 'Processing',
        // disabled: true,
      },
      2: {
        text: '通过审核',
        status: 'Success',
      },
    },
  },
  {
    disable: true,
    title: '性别',
    dataIndex: 'sex',
    search: false,
    valueType: 'select',
    valueEnum: new Map([
      [0, '男'],
      [1, '女'],
    ]),
    render: (_, record) => (
      <Space>
        <Tag color={record.sex ? 'success' : 'error'}>
          {record.sex === 0 ? '男' : record.sex ? '女' : '--'}
        </Tag>
      </Space>
    ),
  },
  {
    title: '角色',
    dataIndex: 'role',
    // copyable: true,
    ellipsis: true,
    editable: false,
    search: false,
    render: (_, record) => (
      <Space>
        <Tag color={roleColor(record.role).color}>
          {roleColor(record.role).role}
        </Tag>
      </Space>
    ),
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.indexNum);
        }}
      >
        编辑
      </a>,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const { userInfo } = useContext(AdminInfoContext);
  if (!userInfo) return <></>;
  return (
    <ProTable<ColumnType & { indexNum: number }>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        try {
          console.log(params.state, 'params.state');
          //调用接口并传参
          const res: SearchUserType = await requestUser({
            companyId: userInfo?.loginRole == 2 ? userInfo?.companyId : '',
            name: params.name,
            phone: params.phone,
            state: params.state,
            current: params.current!,
            size: params.pageSize!,
          });
          console.log(res, 'res');
          if (typeof res === 'object' && 'code' in res) {
            message.error('token失效请重新登录');
            localStorage.clear();
            history.push(`/home`);
          }
          //处理数据格式
          // const data = res.records?.filter(record => record.role != 3).map((data, index) => ({
          //   ...data,
          //   indexNum: index + 1 + (params.current! - 1) * PAGE_SIZE,
          // }));
          const data = res.records?.map((data, index) => ({
            ...data,
            state: data.state.toString(),
            indexNum: index + 1 + (params.current! - 1) * PAGE_SIZE,
          }));
          console.log(data, 'data');
          //返回
          return { data, success: true, total: res.total };
        } catch (e) {
          console.log(e);
          return { data: [], success: true };
        }
      }}
      editable={{
        type: 'multiple',
        onSave: async (key, row, originRow) => {
          try {
            const data = await requestUpdateUser(row);
            if (typeof data === 'object' && 'code' in data) {
              message.error('保存失败');
            } else {
              message.success('保存成功');
            }
            actionRef.current?.reload();
          } catch (e) {
            message.error('添加失败');
            console.log(e);
          }
        },
        onDelete: async (key, row) => {
          try {
            console.log(key, row, 'keyRow');
            const data = await requestDeleteUser(row.userId!);
            if (typeof data === 'object' && 'code' in data) {
              message.error('删除失败');
            } else {
              message.success('删除成功');
            }
            actionRef.current?.reloadAndRest &&
              actionRef.current?.reloadAndRest();
          } catch (e) {
            message.error('添加失败');
            console.log(e);
          }
        },
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="indexNum"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      pagination={{
        pageSize: PAGE_SIZE,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="用户审核表格"
    />
  );
};

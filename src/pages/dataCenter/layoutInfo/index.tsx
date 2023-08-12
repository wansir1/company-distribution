import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, ProCard } from '@ant-design/pro-components';
import { Space, Tag, message } from 'antd';
import { useContext, useRef, useState } from 'react';
import {
  convertToArray,
  dataTest,
  ColumnType,
  SearchIndustryLayoutType,
} from './constants';
import Editable from './Editable';
import styles from './index.less';
import { history } from '@@/core/history';
import { AdminInfoContext } from '@/pages/centralAdministration';
import {
  requestDeleteIndustryLayout,
  requestIndustryLayout,
  requestUpdateIndustryLayout,
} from '@/services/search';

const PAGE_SIZE = 5;

const columns: ProColumns<ColumnType & { indexNum: number }>[] = [
  {
    title: '序号',
    dataIndex: 'indexNum',
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
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.industryTypeId!.toString());
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
  const onChangeTabs = (activeKey: string) => {
    activeKey === 'tab1' ? actionRef.current?.reload() : null;
  };
  if (!userInfo) return;
  return (
    <ProCard tabs={{ type: 'card', onChange: onChangeTabs }}>
      <ProCard.TabPane key="tab1" tab="信息管理">
        <ProTable<ColumnType & { indexNum: number }>
          columns={columns}
          actionRef={actionRef}
          cardBordered
          request={async (params = {}, sort, filter) => {
            try {
              //调用接口并传参
              const res: SearchIndustryLayoutType = await requestIndustryLayout(
                {
                  current: params.current!,
                  size: params.pageSize!,
                  companyId: userInfo?.companyId,
                },
              );
              console.log(res, 'res');
              if (typeof res === 'object' && 'code' in res) {
                message.error('token失效请重新登录');
                localStorage.clear();
                history.push(`/home`);
              }
              //处理数据格式
              const data = res.records?.map((data, index) => ({
                ...data,
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
              console.log(key, row, originRow);

              row.type = Number(row.type);

              try {
                const data = await requestUpdateIndustryLayout(row);
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
                const data = await requestDeleteIndustryLayout(key.toString());
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
          rowKey="industryTypeId"
          search={false}
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
          headerTitle="TBI信息表格"
        />
      </ProCard.TabPane>
      <ProCard.TabPane key="tab2" tab="信息添加">
        <Editable userInfo={userInfo} />
      </ProCard.TabPane>
    </ProCard>
  );
};

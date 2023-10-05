import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, ProCard } from '@ant-design/pro-components';
import { Space, Tag, message } from 'antd';
import { useContext, useRef, useState } from 'react';
import {
  convertToArray,
  dataTest,
  ColumnType,
  SearchFinanceType,
  getFinance,
  updateFinance,
  deleteFinance,
} from './constants';
import Editable from './Editable';
import styles from './index.less';
import { AdminInfoContext } from '@/pages/centralAdministration';

import { history } from 'umi';
import { getCompanyList } from '@/pages/dataCenter/constants';

const PAGE_SIZE = 5;

const columns = (
  role: number,
): ProColumns<ColumnType & { indexNum: number }>[] => {
  //判断角色是否超级管理员 是的话多加列
  let obj: ProColumns<ColumnType & { indexNum: number }>[] =
    role === 3
      ? [
          {
            title: '公司名',
            dataIndex: 'companyId',
            ellipsis: true,
            hideInTable: true,
            valueType: 'select',
            request: getCompanyList,
            fieldProps: {
              showSearch: true,
              fieldNames: {
                label: 'name',
                value: 'companyId',
              },
              // allowClear: true,
              optionFilterProp: 'name',
            },
          },
          {
            title: '起始日期',
            dataIndex: 'startTime',
            valueType: 'date',
            ellipsis: true,
            hideInTable: true,
            tip: '查询某个日期之后的融资信息',
          },
          {
            title: '结束日期',
            dataIndex: 'endTime',
            valueType: 'date',
            ellipsis: true,
            hideInTable: true,
            tip: '查询某个日期之前的融资信息',
          },
          {
            title: '公司名称',
            dataIndex: 'companyName',
            search: false,
            //   fixed: 'left',
            editable: false,
            ellipsis: true,
          },
        ]
      : [];
  return [
    {
      title: '序号',
      dataIndex: 'indexNum',
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
    ...obj,
    {
      title: '融资金额（万）',
      dataIndex: 'amount',
      search: false,
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
          {
            pattern: /^(?:0|[1-9]\d*)$/,
            message: '请输入大于等于0的数字',
          },
        ],
      },
    },
    {
      title: '融资日期',
      dataIndex: 'date',
      valueType: 'date',
      search: false,
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
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.financeId!.toString());
          }}
        >
          编辑
        </a>,
      ],
    },
  ];
};
export default () => {
  const actionRef = useRef<ActionType>();
  const { userInfo } = useContext(AdminInfoContext);
  const onChangeTabs = (activeKey: string) => {
    activeKey === 'tab1' ? actionRef.current?.reload() : null;
  };
  //
  if (!userInfo) return;
  return (
    <ProCard tabs={{ type: 'card', onChange: onChangeTabs }}>
      <ProCard.TabPane key="tab1" tab="信息管理">
        <ProTable<ColumnType & { indexNum: number }>
          columns={columns(userInfo.loginRole)}
          actionRef={actionRef}
          cardBordered
          request={async (params = {}, sort, filter) => {
            let apiParams =
              userInfo.loginRole === 2
                ? {
                    current: params.current!,
                    size: params.pageSize!,
                    companyId: userInfo?.companyId,
                  }
                : {
                    current: params.current!,
                    size: params.pageSize!,
                    companyId: params.companyId,
                    startTime: params.startTime,
                    endTime: params.endTime,
                  };
            try {
              const res: SearchFinanceType = await getFinance[
                userInfo.loginRole
              ](apiParams);
              console.log(res, 'res');
              console.log(
                typeof userInfo?.companyId,
                userInfo?.companyId,
                'cid',
                res,
                typeof res.records[0].companyId,
              );
              if (typeof res === 'object' && 'code' in res) {
                message.error('token失效请重新登录');
                localStorage.clear();
                history.push(`/home`);
              }
              const data = res.records.map((data, index) => ({
                ...data,
                // ratio: parseFloat((data.ratio * 100).toFixed(2)), 有数字额外处理
                indexNum: index + 1 + (params.current! - 1) * PAGE_SIZE,
              }));

              return { data, success: true, total: res.total };
            } catch (e) {
              console.log(e);
            }
            return { data: [], success: true };
          }}
          editable={{
            type: 'multiple',
            onSave: async (key, row, originRow) => {
              console.log(key, row, originRow);

              row.amount = Number(row.amount);
              console.log(
                typeof userInfo?.companyId,
                userInfo?.companyId,
                'cid',
                row,
              );
              try {
                const data = await updateFinance[userInfo.loginRole](row);
                console.log(data, 'savadata');
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
                const data = await deleteFinance[userInfo.loginRole](
                  key.toString(),
                );
                if (typeof data === 'object' && 'code' in data) {
                  message.error('删除失败');
                } else {
                  message.success('删除成功');
                }
                actionRef.current?.reloadAndRest &&
                  actionRef.current?.reloadAndRest();
              } catch (e) {
                message.error('删除失败');
                console.log(e);
              }
            },
          }}
          columnsState={{
            persistenceKey: 'finance',
            persistenceType: 'localStorage',
            onChange(value) {
              console.log('value: ', value);
            },
          }}
          rowKey="financeId"
          search={
            userInfo.loginRole === 3
              ? {
                  labelWidth: 'auto',
                }
              : false
          }
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
          headerTitle="融资信息表格"
        />
      </ProCard.TabPane>
      {userInfo.loginRole === 2 && (
        <ProCard.TabPane key="tab2" tab="信息添加">
          <Editable userInfo={userInfo} />
        </ProCard.TabPane>
      )}
    </ProCard>
  );
};

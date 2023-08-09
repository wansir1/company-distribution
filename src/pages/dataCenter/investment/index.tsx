import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, ProCard } from '@ant-design/pro-components';
import { message } from 'antd';
import { history } from 'umi';
import React, { useRef, useState, useContext } from 'react';
import {
  requestInvestment,
  SearchInvestmentType,
  requestUpdateInvestment,
  requestDeleteInvestment,
} from '@/services/search';
import { AdminInfoContext } from '@/pages/centralAdministration';
import { convertToArray, ColumnType, columns, PAGE_SIZE } from './constants';
import Editable from './Editable';

const Investment: React.FC = () => {
  //   const [current, setCurrent] = useState(1);
  const actionRef = useRef<ActionType>();
  const { userInfo } = useContext(AdminInfoContext);
  const onChangeTabs = (activeKey: string) => {
    activeKey === 'tab1' ? actionRef.current?.reload() : null;
  };
  if (!userInfo) return <></>;
  return (
    <ProCard tabs={{ type: 'card', onChange: onChangeTabs }}>
      <ProCard.TabPane key="tab1" tab="信息管理">
        <ProTable<ColumnType & { indexNum: number }>
          columns={columns}
          actionRef={actionRef}
          cardBordered
          request={async (params = {}, sort, filter) => {
            try {
              const res: SearchInvestmentType = await requestInvestment({
                current: params.current!,
                size: params.pageSize!,
                companyId: userInfo?.companyId,
              });
              if (typeof res === 'object' && 'code' in res) {
                message.error('token失效请重新登录');
                localStorage.clear();
                history.push(`/home`);
              }
              const data = res.records.map((data, index) => ({
                ...data,
                indexNum: index + 1 + (params.current! - 1) * PAGE_SIZE,
              }));
              console.log(data, 'data');
              return { data, success: true, total: res.total };
            } catch (e) {
              console.log(e);
              return { data: [], success: true };
            }

            console.log(sort, filter, params, 'params');
          }}
          editable={{
            type: 'multiple',
            onSave: async (key, row, originRow) => {
              console.log(key, row, originRow, '1111');
              row.business =
                typeof row.business === 'string'
                  ? convertToArray(row.business)
                  : row.business;
              row.amount = Number(row.amount);
              row.ratio = Number(row.ratio) / 100; //这里不处理是因为row.name为string，而定义的类型也为string所以不需要处理
              console.log(key, row, originRow, '22222'); //查看处理后的数据是否符合传给后端的类型数据，符合则通过接口把res传给接口
              try {
                const data = await requestUpdateInvestment(row);
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
                const data = await requestDeleteInvestment(key.toString());
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
          rowKey="companyInvestmentId"
          search={false}
          options={{
            setting: {
              listsHeight: 400,
            },
          }}
          pagination={{
            pageSize: PAGE_SIZE,
            onChange: (page) => {
              console.log(page);
            },
          }}
          dateFormatter="string"
          headerTitle="对外投资表格"
        />
      </ProCard.TabPane>
      <ProCard.TabPane key="tab2" tab="信息添加">
        <Editable userInfo={userInfo} />
      </ProCard.TabPane>
    </ProCard>
  );
};

export default Investment;

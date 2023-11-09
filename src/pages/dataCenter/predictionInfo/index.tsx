import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, ProCard } from '@ant-design/pro-components';
import { message } from 'antd';
import { history } from 'umi';
import React, { useRef, useState, useContext } from 'react';

import { AdminInfoContext } from '@/pages/centralAdministration';
import {
  convertToArray,
  ColumnType,
  columns,
  PAGE_SIZE,
  testData,
  checkRuler,
  YEAR_NUMBER,
  YEAR_MOUTH_NUMBER,
  SearchPredictionInfoType,
} from './constants';
import Editable from './Editable';
import {
  requestDeletePredictionInfo,
  requestPredictionInfo,
  requestUpdatePredictionInfo,
} from '@/services/admin';

const PredictionInfo: React.FC = () => {
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
          scroll={{ x: 'max-content' }}
          //根据权限给表格列
          columns={columns(userInfo.loginRole)}
          actionRef={actionRef}
          cardBordered
          request={async (params = {}, sort, filter) => {
            try {
              //调用接口并传参
              const res: SearchPredictionInfoType = await requestPredictionInfo(
                {
                  current: params.current!,
                  size: params.pageSize!,
                  name: '',
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
              row.data1 =
                typeof row.data1 === 'string'
                  ? convertToArray(row.data1)
                  : row.data1;
              row.data2 =
                typeof row.data2 === 'string'
                  ? convertToArray(row.data2)
                  : row.data2;
              if (
                row.data1.length < 3 ||
                row.data1.length != row.data2.length
              ) {
                message.error(
                  '添加失败,x轴值数量应当与y轴值数量相同,且都不少于3个及3个以上数据',
                );
                actionRef.current?.reload();
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
                actionRef.current?.reload();
                return;
              }
              try {
                const data = await requestUpdatePredictionInfo(row);
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
                const data = await requestDeletePredictionInfo(key.toString());
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
            persistenceKey: 'predictionInfo',
            persistenceType: 'localStorage',
            onChange(value) {
              console.log('value: ', value);
            },
          }}
          rowKey="predictId"
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
            onChange: (page) => {
              console.log(page);
            },
          }}
          dateFormatter="string"
          headerTitle="投资信息表格"
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

export default PredictionInfo;

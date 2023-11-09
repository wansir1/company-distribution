import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, ProCard } from '@ant-design/pro-components';
import { Space, Tag, message } from 'antd';
import { useContext, useRef, useState } from 'react';
import { dataTest, ColumnType, SearchModel } from './constants';
import styles from './index.less';
import { history } from 'umi';
import { AdminInfoContext } from '@/pages/centralAdministration';
import { requestModel, requestUpdateModel } from '@/services/superAdmin';

const PAGE_SIZE = 5;

const columns: ProColumns<ColumnType & { indexNum: number }>[] = [
  {
    title: '序号',
    dataIndex: 'indexNum',
    editable: false,
    search: false,
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
    title: '模型名称',
    dataIndex: 'modelName',
    search: false,
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
    title: '权重',
    search: false,
    dataIndex: 'proportion',
    ellipsis: true,
    tip: '模型之间的权重之和等于1',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
        {
          pattern: /^(0(\.\d+)?|1(\.0+)?)$/,
          message: '只能填入一个数字，范围在0到1之间，包括0和1',
        },
      ],
    },
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    search: false,
    width: 250,
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.modelId!.toString());
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
              const res: SearchModel[] = await requestModel();
              console.log(res, 'res');
              if (typeof res === 'object' && 'code' in res) {
                message.error('token失效请重新登录');
                localStorage.clear();
                history.push(`/home`);
              }
              //处理数据格式
              const data = res.map((data, index) => ({
                ...data,
                indexNum: index + 1 + (params.current! - 1) * PAGE_SIZE,
              }));
              console.log(data, 'data');
              //返回
              return { data, success: true, total: data.length };
            } catch (e) {
              console.log(e);
              return { data: [], success: true };
            }
          }}
          editable={{
            type: 'multiple',
            onSave: async (key, row, originRow) => {
              console.log(key, row, originRow);
              row.proportion = Number(row.proportion);
              let transData: SearchModel[] = [];
              if (row.modelId === '1') {
                transData = [
                  {
                    modelId: '1',
                    modelName: '灰度模型',
                    proportion: row.proportion,
                  },
                  {
                    modelId: '2',
                    modelName: 'lasso',
                    proportion: 1 - row.proportion,
                  },
                ];
              } else {
                transData = [
                  {
                    modelId: '1',
                    modelName: '灰度模型',
                    proportion: 1 - row.proportion,
                  },
                  {
                    modelId: '2',
                    modelName: 'lasso',
                    proportion: row.proportion,
                  },
                ];
              }
              try {
                const data = await requestUpdateModel(transData);
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
              message.error('删除失败，不可删除');
            },
            actionRender: (row, config, defaultDom) => [
              defaultDom.save,
              defaultDom.cancel,
            ],
          }}
          columnsState={{
            persistenceKey: 'model',
            persistenceType: 'localStorage',
            onChange(value) {
              console.log('value: ', value);
            },
          }}
          rowKey="modelId"
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
          headerTitle="模型表格"
        />
      </ProCard.TabPane>
    </ProCard>
  );
};

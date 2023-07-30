import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, ProCard } from '@ant-design/pro-components';
import { Space, Tag, message } from 'antd';
import { useRef, useState } from 'react';
import { convertToArray, dataTest, ColumnType } from './constants';
import Editable from './Editable';
import styles from './index.less';
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

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
    title: '软著名称',
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
    title: '版本号',
    dataIndex: 'versionNumber',
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
    title: '登记编号',
    dataIndex: 'registrationNumber',
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
    title: '登记日期',
    dataIndex: 'registrationTime',
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
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.softwareWritingId!.toString());
        }}
      >
        编辑
      </a>,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProCard tabs={{ type: 'card' }}>
      <ProCard.TabPane key="tab1" tab="信息管理">
        <ProTable<ColumnType & { indexNum: number }>
          columns={columns}
          actionRef={actionRef}
          cardBordered
          request={async (params = {}, sort, filter) => {
            await waitTime(2000);
            const data2 = dataTest.map((data, index) => ({
              ...data,
              indexNum: index + 1,
            }));
            console.log(sort, filter, params, data2, 'params');
            return { data: data2, success: true, total: 30 };
          }}
          editable={{
            type: 'multiple',
            onSave: async (key, row, originRow) => {
              console.log(key, row, originRow);

              try {
                message
                  .loading('Action in progress..', 1)
                  .then(() => message.success('添加成功', 2.5));

                await new Promise((resolve) => {
                  setTimeout(() => {
                    resolve(true);
                  }, 2000);
                });
              } catch (e) {
                message.error('添加失败');
                console.log(e);
              }
              actionRef.current?.reload();
            },
          }}
          columnsState={{
            persistenceKey: 'pro-table-singe-demos',
            persistenceType: 'localStorage',
            onChange(value) {
              console.log('value: ', value);
            },
          }}
          rowKey="softwareWritingId"
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
          headerTitle="软著信息表格"
        />
      </ProCard.TabPane>
      <ProCard.TabPane key="tab2" tab="信息添加">
        <Editable />
      </ProCard.TabPane>
    </ProCard>
  );
};

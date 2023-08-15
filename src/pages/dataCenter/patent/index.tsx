import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, ProCard } from '@ant-design/pro-components';
import { Space, Tag, message } from 'antd';
import { useRef, useState, useContext } from 'react';
import {
  convertToArray,
  dataTest,
  ColumnType,
  SearchPatentType,
} from './constants';
import Editable from './Editable';
import styles from './index.less';
import { history } from '@@/core/history';
import { AdminInfoContext } from '@/pages/centralAdministration';
import {
  requestDeletePatent,
  requestPatent,
  requestUpdatePatent,
} from '@/services/search';

const PAGE_SIZE = 5;

const columns: ProColumns<ColumnType & { indexNum: number }>[] = [
  {
    title: '序号',
    dataIndex: 'indexNum',
    editable: false,
    fixed: 'left',
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
    title: '专利名称',
    dataIndex: 'name',
    ellipsis: true,
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
    title: '专利类型',
    dataIndex: 'type',
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
    title: '专利状态',
    dataIndex: 'state',
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
    title: '发明人',
    dataIndex: 'inventor',
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
    title: '申请人',
    dataIndex: 'applicant',
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
    title: '申请号',
    dataIndex: 'applicationNumber',
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
    title: '申请日',
    dataIndex: 'applicationTime',
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
    title: '公开号',
    dataIndex: 'publicNumber',
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
    title: '公开日',
    dataIndex: 'publicTime',
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
    width: 175,
    key: 'option',
    fixed: 'right',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.patentId!.toString());
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
          scroll={{ x: 'max-content' }}
          actionRef={actionRef}
          cardBordered
          request={async (params = {}, sort, filter) => {
            try {
              //调用接口并传参
              const res: SearchPatentType = await requestPatent({
                current: params.current!,
                size: params.pageSize!,
                companyId: userInfo?.companyId,
              });
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

              try {
                const data = await requestUpdatePatent(row);
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
                const data = await requestDeletePatent(key.toString());
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
            persistenceKey: 'patent',
            persistenceType: 'localStorage',
            onChange(value) {
              console.log('value: ', value);
            },
          }}
          rowKey="patentId"
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
          headerTitle="专利信息表格"
        />
      </ProCard.TabPane>
      <ProCard.TabPane key="tab2" tab="信息添加">
        <Editable userInfo={userInfo} />
      </ProCard.TabPane>
    </ProCard>
  );
};

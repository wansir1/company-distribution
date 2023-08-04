import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, ProCard } from '@ant-design/pro-components';
import { Space, Tag, message } from 'antd';
import { useRef, useState, useContext } from 'react';
import { requestInvestment, SearchInvestmentType } from '@/services/search';
import { AdminInfoContext } from '@/pages/centralAdministration';
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
    renderText: (text) => {
      const numb = parseFloat((text * 100).toFixed(2));
      return numb.toString(); //官网要求返回字符串
    },
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
    // copyable: true,
    ellipsis: true,
    tip: '相互之间以英文逗号隔开',
    formItemProps: {
      rules: [
        {
          pattern: /^([\u4E00-\u9FA5a-zA-Z1-9]+)(,[\u4E00-\u9FA5a-zA-Z1-9]+)*$/,
          message: '请输入技术或业务名称，并以英文逗号隔开',
        },
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    render: (_, record) => (
      <Space style={{ flexWrap: 'wrap' }}>
        {Array.isArray(record.business) &&
          record.business.map((item) => <Tag color={'gold'}>{item}</Tag>)}
        {console.log('tagtag', record)}
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
          action?.startEditable?.(record.companyInvestmentId!.toString());
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
  if (!userInfo) return;
  return (
    <ProCard tabs={{ type: 'card' }}>
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
              const data = res.records.map((data, index) => ({
                ...data,
                indexNum: index + 1,
              }));
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
          rowKey="companyInvestmentId"
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
          headerTitle="对外投资表格"
        />
      </ProCard.TabPane>
      <ProCard.TabPane key="tab2" tab="信息添加">
        <Editable />
      </ProCard.TabPane>
    </ProCard>
  );
};

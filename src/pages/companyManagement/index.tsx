import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ProTable,
  ProFormSelect,
  ProFormInstance,
} from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import { useRef, useState } from 'react';
import { dataTest, ColumnType } from './constants';
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

export default () => {
  const actionRef = useRef<ActionType>();
  const [stateValue, setStateValue] = useState<string>('Unaltered');

  const handleStateChange = (value: any) => {
    setStateValue('');
  };

  const columns: ProColumns<ColumnType & { indexNum: number }>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      search: false,
      editable: false,
      valueType: 'indexBorder',
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
      search: false,
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
      fieldProps: {
        onChange: handleStateChange,
        onSelect: handleStateChange,
      },
    },
    {
      disable: true,
      title: '状态',
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
      //   request: async (params) => {
      //     console.log(params,'params')
      //     let num = [
      //       [
      //         { sex: '男1', value: 0 },
      //         { value: 1, sex: '女1' },
      //       ],
      //       [
      //         { sex: '男2', value: 0 },
      //         { value: 1, sex: '女2' },
      //       ],
      //       [],
      //     ];
      //     return num[1];
      //   },
      //   fieldProps: {
      //     showSearch: true,
      //     fieldNames: {
      //       label: 'sex',
      //       value: 'value',
      //     },
      //   },
      // valueEnum: new Map([
      //   [0, '男'],
      //   [1, '女'],
      // ]),
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        console.log(rest, type, 'state', item);
        return (
          <div style={{ paddingTop: '24px' }}>
            <ProFormSelect
              {...rest}
              params={{ id: rest.record?.state }}
              request={async () => {
                let num = [
                  [
                    { sex: '男1', value: 0 },
                    { value: 1, sex: '女1' },
                  ],
                  [
                    { sex: '男2', value: 0 },
                    { value: 1, sex: '女2' },
                  ],
                  [],
                ];
                return num[Number(rest.record?.state)];
              }}
              fieldProps={{
                showSearch: true,
                style: { background: 'red' },
                fieldNames: {
                  label: 'sex',
                  value: 'value',
                },
                value: stateValue ? rest.record?.sex : '',
                onChange: () => {
                  setStateValue('unaltered');
                },
              }}
            />
          </div>
        );
      },
      render: (_, record) => (
        <Space>
          <Tag color={record.sex ? 'success' : 'error'}>
            {record.sex === 0 ? '男' : record.sex ? '女2' : '--'}
          </Tag>
        </Space>
      ),
    },
    // {
    //   disable: true,
    //   title: '性别',
    //   dataIndex: 'sex',
    //   search: false,
    //   valueType: 'select',
    //   request: async () => {
    //     let num = [
    //       [
    //         { sex: '男1', value: 0 },
    //         { value: 1, sex: '女1' },
    //       ],
    //       [
    //         { sex: '男2', value: 0 },
    //         { value: 1, sex: '女2' },
    //       ],
    //       [],
    //     ];
    //     return num[1];
    //   },
    //   fieldProps: {
    //     showSearch: true,
    //     fieldNames: {
    //       label: 'sex',
    //       value: 'value',
    //     },
    //     //   value: stateValue? rest.record?.sex : '',
    //     onChange: () => {
    //       setStateValue('unaltered');
    //     },
    //   },
    //   // valueEnum: new Map([
    //   //   [0, '男'],
    //   //   [1, '女'],
    //   // ]),
    //   //   renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
    //   //     console.log(rest, type, 'state', item);
    //   //     return (
    //   //       <ProFormSelect
    //   //         {...rest}
    //   //         params={{ id: rest.record?.state }}
    //   //         request={async () => {
    //   //           let num = [
    //   //             [
    //   //               { sex: '男1', value: 0 },
    //   //               { value: 1, sex: '女1' },
    //   //             ],
    //   //             [
    //   //               { sex: '男2', value: 0 },
    //   //               { value: 1, sex: '女2' },
    //   //             ],
    //   //             [],
    //   //           ];
    //   //           return num[Number(rest.record?.state)];
    //   //         }}
    //   //         fieldProps={{
    //   //           showSearch: true,
    //   //           fieldNames: {
    //   //             label: 'sex',
    //   //             value: 'value',
    //   //           },
    //   //           value: stateValue? rest.record?.sex : '',
    //   //           onChange: () => {
    //   //             setStateValue('unaltered');
    //   //           }
    //   //         }}
    //   //       />
    //   //     );
    //   //   },
    //   //   render: (_, record) => (
    //   //     <Space>
    //   //       <Tag color={record.sex ? 'success' : 'error'}>
    //   //         {record.sex === 0 ? '男' : record.sex ? '女' : '--'}
    //   //       </Tag>
    //   //     </Space>
    //   //   ),
    // },
    {
      title: '角色',
      dataIndex: 'role',
      // copyable: true,
      ellipsis: true,
      editable: false,
      search: false,
      render: (_, record) => (
        <Space>
          <Tag color={record.role === 1 ? 'lime' : 'purple'}>
            {record.role === 1 ? '普通用户' : '普通管理员'}
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
            action?.startEditable?.(record.userId);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];
  return (
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
          console.log(key, row, originRow, 'jj');
          setStateValue('unaltered');
          actionRef.current?.reload();
        },
        onDelete: async () => {
          setStateValue('unaltered');
        },
        onCancel: async () => {
          setStateValue('unaltered');
        },
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="userId"
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

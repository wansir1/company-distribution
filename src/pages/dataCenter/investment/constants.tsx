import type { ProColumns } from '@ant-design/pro-components';
import styles from './index.less';
import { Space, Tag } from 'antd';
import { getCompanyList, ApiFunctions } from '../constants';
import {
  requestInvestment,
  requestUpdateInvestment,
  requestDeleteInvestment,
} from '@/services/admin';
import {
  requestInvestmentSuper,
  requestUpdateInvestmentSuper,
  requestDeleteInvestmentSuper,
} from '@/services/superAdmin';
export type ColumnType = {
  companyInvestmentId?: string;
  name: string;
  ratio: number;
  amount: number;
  companyId?: string;
  companyName?: string;
  business: string[];
};
// 字符串转数组
export function convertToArray(str: string): string[] {
  return str.includes(',') ? str.split(',') : [str];
}

export const PAGE_SIZE = 5; // 一页展示数量
//设置表格列 根据role
export const columns = (
  role: number,
): ProColumns<ColumnType & { indexNum: number }>[] => {
  //判断角色是否超级管理员 是的话多加列
  let obj: ProColumns<ColumnType & { indexNum: number }>[] =
    role === 3
      ? [
          {
            title: '被投公司（模糊）',
            dataIndex: 'name',
            ellipsis: true,
            hideInTable: true,
          },
          {
            title: '投资公司',
            dataIndex: 'companyName',
            search: false,
            //   fixed: 'left',
            editable: false,
            ellipsis: true,
          },
          {
            title: '投资公司（精确）',
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
        ]
      : [];
  return [
    {
      title: '序号',
      dataIndex: 'indexNum',
      editable: false,
      search: false,
      width: 48,
      fixed: 'left',
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
      title: '被投公司',
      dataIndex: 'name',
      ellipsis: true,
      editable: false,
      search: false,
      fixed: 'left',
      tip: '被投资的公司',
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
      search: false,
      width: 150,
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
      search: false,
      width: 150,
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
      search: false,
      ellipsis: true,
      tip: '相互之间以英文逗号隔开',
      formItemProps: {
        rules: [
          {
            pattern:
              /^([\u4E00-\u9FA5a-zA-Z1-9]+)(,[\u4E00-\u9FA5a-zA-Z1-9]+)*$/,
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
      fixed: 'right',
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
};

export const getInvestment: ApiFunctions = {
  2: requestInvestment,
  3: requestInvestmentSuper,
};

export const updateInvestment: ApiFunctions = {
  2: requestUpdateInvestment,
  3: requestUpdateInvestmentSuper,
};

export const deleteInvestment: ApiFunctions = {
  2: requestDeleteInvestment,
  3: requestDeleteInvestmentSuper,
};

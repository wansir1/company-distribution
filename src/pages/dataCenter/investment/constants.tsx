import type { ProColumns } from '@ant-design/pro-components';
import styles from './index.less';
import { Space, Tag } from 'antd';
export type ColumnType = {
  companyInvestmentId?: string;
  name: string;
  ratio: number;
  amount: number;
  companyId?: string;
  business: string[];
};
export const dataTest = [
  {
    companyInvestmentId: 1,
    name: '对外公司名称',
    ratio: 1,
    amount: 1000,
    companyId: 1,
    business: ['科技', '种田', '西瓜', '科技', '种田', '西瓜'],
  },
];

// 字符串转数组
export function convertToArray(str: string): string[] {
  return str.includes(',') ? str.split(',') : [str];
}

export const PAGE_SIZE = 5; // 一页展示数量
export const columns: ProColumns<ColumnType & { indexNum: number }>[] = [
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

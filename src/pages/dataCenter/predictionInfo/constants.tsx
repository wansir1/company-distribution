import type { ProColumns } from '@ant-design/pro-components';
import styles from './index.less';
import { message, Space } from 'antd';
import { number } from 'echarts';

export type ColumnType = {
  predictId?: string;
  name: string;
  data1: number[];
  data2: number[];
  units?: string;
  companyId?: string;
};
export type SearchPredictionInfoType = {
  records: Records[];
  total: number;
  size: number;
  current: number;
  orders?: any[];
  searchCount: boolean;
  pages: number;
};

export type Records = {
  predictId?: string;
  name: string;
  data1: number[];
  data2: number[];
  units?: string;
  companyId?: string;
};
// 字符串转数组
export function convertToArray(str: string): number[] {
  const array = str.includes(',') ? str.split(',') : [str];
  return array.map((item) => Number(item.trim()));
}
const date = new Date();
export const YEAR_NUMBER = date.getFullYear();
export const YEAR_MOUTH_NUMBER = date.getFullYear() * 100 + date.getMonth() + 1;
export function checkRuler(value: number[], dateNumber: number): boolean {
  if (value[0].toString().length === 6 && value.some((num) => num % 100 > 12)) {
    message.error('添加失败,月份数字大小应小于等于12');
    return false;
  }
  for (let i = 0; i < value.length - 1; i++) {
    if (value[i] >= value[i + 1]) {
      message.error('添加失败,年份或年月份应从小到大进行输入且不得重复');
      return false;
    }
  }
  if (value[value.length - 1] > dateNumber) {
    message.error('添加失败,年份或年月份不得超过当前日期');
    return false;
  }
  return true;
}
export const testData: ColumnType[] = [
  {
    predictId: '111',
    name: 'xx利润',
    data1: [2021, 2022, 2023],
    data2: [481, 651, 561],
    units: '万元',
  },
  {
    predictId: '222',
    name: 'xxxxx利润',
    data1: [202101, 202201, 202301],
    data2: [422, 6522, 5622],
    units: '万元',
  },
];
export const PAGE_SIZE = 5; // 一页展示数量
//设置表格列 根据role
export const columns = (
  role: number,
): ProColumns<ColumnType & { indexNum: number }>[] => {
  //判断角色是否超级管理员 是的话多加列
  let obj: ProColumns<ColumnType & { indexNum: number }>[] =
    role === 3 ? [] : [];
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
      title: '预测内容',
      dataIndex: 'name',
      ellipsis: true,
      editable: false,
      search: false,
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
      title: 'x轴值',
      dataIndex: 'data1',
      //copyable: true,
      search: false,
      ellipsis: true,
      tip: '相互之间以英文逗号隔开，x轴值与y轴值数量需相等',
      formItemProps: {
        rules: [
          {
            pattern:
              /^(?:[1-9]\d{3}(?:,[1-9]\d{3})*|[1-9]\d{5}(?:,[1-9]\d{5})*)$/,
            message:
              '请输入全为四位数或六位数的数字序列，且以英文逗号隔开，每个数字不能以0开头',
          },
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      render: (_, record) => (
        <Space style={{ flexWrap: 'wrap' }}>
          {Array.isArray(record.data1) && record.data1}
        </Space>
      ),
    },
    {
      title: 'y轴值',
      dataIndex: 'data2',
      // copyable: true,
      search: false,
      ellipsis: true,
      tip: '相互之间以英文逗号隔开，y轴值与x轴值数量需相等',
      formItemProps: {
        rules: [
          {
            pattern: /^\d+(,\d+)*$/,
            message: '请输入一个数字序列，以英文逗号隔开',
          },
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      render: (_, record) => (
        <Space style={{ flexWrap: 'wrap' }}>
          {Array.isArray(record.data2) && record.data2}
        </Space>
      ),
    },
    {
      title: '单位',
      dataIndex: 'units',
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
      title: '操作',
      fixed: 'right',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.predictId!.toString());
          }}
        >
          编辑
        </a>,
      ],
    },
  ];
};

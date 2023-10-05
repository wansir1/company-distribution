import type {
  ActionType,
  ProColumns,
  Search,
} from '@ant-design/pro-components';
import { ProTable, ProCard, ProFormSelect } from '@ant-design/pro-components';
import { message, Space, Tag } from 'antd';
import { useContext, useRef, useState } from 'react';
import { dataTest, ColumnType, SearchCompanyType } from './constants';
import styles from './index.less';
import AddForm from './addForm';
import { AdminInfoContext } from '@/pages/centralAdministration';
import { history } from 'umi';
import {
  requestCompanyInfoSuper,
  requestDeleteCompanyInfoSuper,
  requestUpdateCompanyInfoSuper,
} from '@/services/superAdmin';
import { getCompanyList } from '@/pages/dataCenter/constants';
import {
  getCity,
  getDistrict,
  getIndustryType,
  getProvince,
} from '@/pages/companyCentral/constants';
import industryType from '@/pages/dataCenter/industryType';
import { FormLabelAlign } from 'antd/lib/form/interface';
const PAGE_SIZE = 5;

export default () => {
  const { userInfo } = useContext(AdminInfoContext);
  const actionRef = useRef<ActionType>();
  const [provinceState, setProvinceState] = useState('unaltered');
  const [cityState, setCityState] = useState('unaltered');
  const [provinceValue, setProvinceValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const handleProvinceChange = () => {
    setProvinceState('');
  };
  const handleCityChange = () => {
    setCityState('');
  };
  const onChangeTabs = (activeKey: string) => {
    activeKey === 'tab1' ? actionRef.current?.reload() : null;
  };
  const columns: ProColumns<ColumnType & { indexNum: number }>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      fixed: 'left',
      search: false,
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
    //查询栏
    {
      title: '公司名',
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
        optionFilterProp: 'name',
      },
    },
    {
      title: '产业类型',
      dataIndex: 'industryTypeId',
      ellipsis: true,
      hideInTable: true,
      valueType: 'select',
      request: getIndustryType,
      fieldProps: {
        showSearch: true,
        mode: 'multiple',
        fieldNames: {
          label: 'name',
          value: 'typeId',
        },
        optionFilterProp: 'name',
      },
    },
    //查询栏//查询栏//查询栏

    {
      title: '企业名称',
      dataIndex: 'name',
      fixed: 'left',
      search: false,
      ellipsis: true,
      tip: '企业名过长会自动收缩',
    },
    {
      title: '产业类型',
      dataIndex: 'industryTypeId',
      ellipsis: true,
      search: false,
      valueType: 'select',
      request: getIndustryType,
      fieldProps: {
        showSearch: true,
        mode: 'multiple',
        fieldNames: {
          label: 'name',
          value: 'typeId',
        },
        optionFilterProp: 'name',
      },
      render: (_, record) => (
        <Space style={{ flexWrap: 'wrap' }}>
          {Array.isArray(record.industryTypeName) &&
            record.industryTypeName.map((item) => (
              <Tag color={'blue'}>{item}</Tag>
            ))}
        </Space>
      ),
    },
    {
      title: '省',
      dataIndex: 'provinceId',
      search: false,
      valueType: 'select',
      ellipsis: true,
      request: getProvince,
      fieldProps: {
        showSearch: true,
        fieldNames: {
          label: 'provinceName',
          value: 'provinceId',
        },
        optionFilterProp: 'provinceName',
        onChange: handleProvinceChange,
        onSelect: handleProvinceChange,
      },
    },
    {
      title: '省',
      dataIndex: 'provinceId',
      // search: true,
      hideInTable: true,
      valueType: 'select',
      ellipsis: true,
      request: getProvince,
      fieldProps: {
        showSearch: true,
        fieldNames: {
          label: 'provinceName',
          value: 'provinceId',
        },
        onChange: (value: string) => setProvinceValue(value),
        onSelect: (value: string) => setProvinceValue(value),
        optionFilterProp: 'provinceName',
      },
    },

    {
      title: '市',
      dataIndex: 'cityId',
      search: false,
      valueType: 'select',
      ellipsis: true,
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        //console.log(rest, type, 'state', item);
        return (
          <div style={{ paddingTop: '24px' }}>
            <ProFormSelect
              {...rest}
              params={{ id: rest.record?.provinceId }}
              request={async () =>
                rest.record?.provinceId
                  ? getCity(rest.record?.provinceId!.toString())
                  : []
              }
              fieldProps={{
                showSearch: true,
                fieldNames: {
                  label: 'cityName',
                  value: 'cityId',
                },
                value: provinceState ? rest.record?.cityId : '',
                onChange: () => {
                  setProvinceState('unaltered');
                  handleCityChange();
                },
                onSelect: () => {
                  handleCityChange();
                },
              }}
            />
          </div>
        );
      },
      render: (dom, record) => {
        //console.log(dom,'dom',record);
        return record.cityName;
      },
    },
    {
      title: '市',
      dataIndex: 'cityId',
      //search: false,
      hideInTable: true,
      valueType: 'select',
      ellipsis: true,
      params: { provinceValue },
      request: async (params) => {
        console.log(params, 'cityParams', params.provinceValue);
        return params.provinceValue ? getCity(params.provinceValue) : [];
      },
      fieldProps: {
        showSearch: true,
        fieldNames: {
          label: 'cityName',
          value: 'cityId',
        },
        onChange: (value: string) => setCityValue(value),
        onSelect: (value: string) => setCityValue(value),
      },
    },
    {
      title: '县',
      dataIndex: 'districtId',
      search: false,
      //request:getDistrict,
      valueType: 'select',
      ellipsis: true,
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        //console.log(rest, type, 'state', item);
        return (
          <div style={{ paddingTop: '24px' }}>
            <ProFormSelect
              {...rest}
              params={{ id: rest.record?.cityId }}
              request={async () =>
                rest.record?.cityId
                  ? getDistrict(rest.record?.cityId!.toString())
                  : []
              }
              fieldProps={{
                showSearch: true,
                fieldNames: {
                  label: 'districtName',
                  value: 'districtId',
                },
                value: cityState ? rest.record?.districtId : '',
                onChange: () => {
                  setCityState('unaltered');
                },
              }}
            />
          </div>
        );
      },
      render: (dom, record) => {
        //console.log(dom,'dom',record);
        return record.districtName;
      },
    },
    {
      title: '县',
      dataIndex: 'districtId',
      //search: false,
      hideInTable: true,
      //request:getDistrict,
      params: { cityValue },
      request: async (params) => {
        console.log(params, 'cityParams', params.cityValue);
        return params.cityValue ? getDistrict(params.cityValue) : [];
      },
      valueType: 'select',
      ellipsis: true,
      fieldProps: {
        showSearch: true,
        fieldNames: {
          label: 'districtName',
          value: 'districtId',
        },
      },
    },
    {
      title: '详细地址',
      dataIndex: 'address',
      search: false,

      ellipsis: true,
    },
    {
      title: '经度',
      dataIndex: 'longitude',
      search: false,

      ellipsis: true,
    },
    {
      title: '纬度',
      dataIndex: 'latitude',
      search: false,

      ellipsis: true,
    },
    {
      title: '法人',
      dataIndex: 'legalRepresentative',
      search: false,

      ellipsis: true,
    },
    {
      title: '统一社会信用代码',
      dataIndex: 'creditCode',
      search: false,

      ellipsis: true,
    },
    {
      title: '登记状态',
      dataIndex: 'registerStatus',
      search: false,

      ellipsis: true,
    },
    {
      title: '单位电话',
      dataIndex: 'phone',
      search: false,

      ellipsis: true,
    },
    {
      title: '邮政编码',
      dataIndex: 'postCode',
      search: false,

      ellipsis: true,
    },
    {
      title: '电子邮箱',
      dataIndex: 'email',
      search: false,

      ellipsis: true,
    },
    {
      title: '公司网址',
      dataIndex: 'website',
      search: false,

      ellipsis: true,
    },
    {
      title: '注册地址',
      dataIndex: 'registeredAddress',
      search: false,

      ellipsis: true,
    },
    {
      title: '注册资本',
      dataIndex: 'registeredCapital',
      search: false,

      ellipsis: true,
    },
    {
      title: '注册日期',
      dataIndex: 'registeredTime',
      valueType: 'date',
      search: false,

      ellipsis: true,
    },
    {
      title: '经营日期',
      dataIndex: 'validTime',
      valueType: 'date',
      search: false,

      ellipsis: true,
    },

    {
      title: '操作',
      valueType: 'option',
      width: 175,
      fixed: 'right',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            //console.log(record,"record1");
            action?.startEditable?.(record.companyId!.toString());
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  if (!userInfo) return;
  return (
    <ProCard tabs={{ type: 'card', onChange: onChangeTabs }}>
      <ProCard.TabPane key="tab1" tab="企业信息管理">
        <ProTable<ColumnType & { indexNum: number }>
          columns={columns}
          scroll={{ x: 'max-content' }}
          actionRef={actionRef}
          cardBordered
          request={async (params = {}, sort, filter) => {
            //console.log(params.industryTypeId,"params.industryTypeId")
            try {
              //调用接口并传参
              const res: SearchCompanyType = await requestCompanyInfoSuper({
                current: params.current!,
                size: params.pageSize!,
                companyId: params.companyId,
                companyName: params.name,
                provinceId: params.provinceId,
                cityId: params.cityId,
                //industryTypeId?
                type: params.industryTypeId,
                //变量名 接口文档与apipost不同
                districtId: params.districtId,
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
                industryTypeId: JSON.parse(data.industryTypeId!)?.map(String),
                cityId: data.cityId?.toString(),
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
              console.log(key, row, originRow, 'jj');
              row.registeredCapital = Number(row.registeredCapital);
              // row.industryTypeId = JSON.parse(row.industryTypeId!).map(String);
              try {
                const data = await requestUpdateCompanyInfoSuper(row);
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

              actionRef.current?.reload();
            },
            onDelete: async (key, row) => {
              try {
                console.log(key, row, 'keyRow');
                const data = await requestDeleteCompanyInfoSuper(
                  row.companyId!,
                );
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
            persistenceKey: 'companyManagement',
            persistenceType: 'localStorage',
            onChange(value) {
              console.log('value: ', value);
            },
          }}
          rowKey="companyId"
          search={{
            labelWidth: 'auto',
            // collapsed: false,
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
          headerTitle="企业管理表格"
        />
      </ProCard.TabPane>
      <ProCard.TabPane key="tab2" tab="添加企业">
        <AddForm />
      </ProCard.TabPane>
    </ProCard>
  );
};

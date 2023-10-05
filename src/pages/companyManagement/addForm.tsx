import {
  ProCard,
  ProForm,
  ProFormDatePicker,
  ProFormDependency,
  ProFormGroup,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormInstance,
} from '@ant-design/pro-components';
import {
  CompanyParam,
  PersonParam,
  requestCity,
  requestCompany,
  requestCompanyInfo,
  requestDistricts,
  requestUpdateCompanyInfo,
  requestUpdateUserInfo,
  requestUserInfo,
  SearchCompanyType,
} from '@/services/search';
import {
  getIndustryType,
  getProvince,
  getCity,
  getDistrict,
} from '../companyCentral/constants';
import { Col, message, Row, Space, Switch } from 'antd';
import type { FormLayout } from 'antd/lib/form/Form';
import React, { useContext, useRef, useState } from 'react';
import { GlobalInfoContext } from '@/pages/layouts';
import { AdminInfoContext } from '@/pages/centralAdministration';
import { isNotEmptyObj } from '@/utils/helper';
import { requestUpdateCompanyInfoSuper } from '@/services/superAdmin';

const LAYOUT_TYPE_HORIZONTAL = 'horizontal';
type PropsType = {
  role?: number;
};

const AddForm: React.FC<PropsType> = (props) => {
  const [formLayoutType, setFormLayoutType] = useState<FormLayout>(
    LAYOUT_TYPE_HORIZONTAL,
  );
  const [edit, setEdit] = useState(true);
  const formRef = useRef<ProFormInstance>();
  const { role } = props;
  // 这里是因为用户也有这个模块，要不然不用判断直接useContext(AdminInfoContext)获取就可以了
  const { userInfo } =
    role === 1 ? useContext(GlobalInfoContext) : useContext(AdminInfoContext);
  const [refresh, setRefresh] = useState(false);
  console.log(userInfo, 'user info');
  return (
    <ProCard>
      <ProForm<CompanyParam | {}>
        layout={formLayoutType}
        grid={true}
        //xiugai
        formRef={formRef}
        disabled={!edit}
        rowProps={{
          gutter: [16, formLayoutType === 'inline' ? 16 : 0],
        }}
        submitter={{
          searchConfig: { submitText: '添加' },
          render: (props, doms) => {
            return formLayoutType === LAYOUT_TYPE_HORIZONTAL ? (
              <Row>
                <Col span={14} offset={10} style={{ direction: 'rtl' }}>
                  <Space size="middle">{doms}</Space>
                </Col>
              </Row>
            ) : (
              doms
            );
          },
        }}
        onFinish={async (values) => {
          if (isNotEmptyObj(values)) {
            values.registeredCapital = Number(values.registeredCapital);
            try {
              console.log(values, 'values');
              const data = await requestUpdateCompanyInfoSuper({
                ...values,
                // companyId: Date.now().toString(),
              });
              if ('code' in data) {
                message.error('保存失败');
              } else {
                message.success('保存成功');
              }
              setRefresh(!refresh);

              formRef?.current?.setFieldsValue(values);
            } catch (err) {
              console.log(err);
              message.warning('系统修复中或重新登录');
            }
          }
        }}
        params={{}}
        //查询信息显示
        request={async () => {
          return {};
        }}
        autoFocusFirstInput
      >
        <ProFormText
          name="name"
          label="企业名称"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />
        <ProFormText
          colProps={{ md: 12, xl: 8 }}
          name="creditCode"
          label="统一社会信用代码"
        />
        <ProFormText
          colProps={{ md: 12, xl: 8 }}
          name="phone"
          label="单位电话"
        />
        <ProFormText
          colProps={{ md: 12, xl: 8 }}
          name="postCode"
          label="邮政编码"
        />

        <ProFormText
          colProps={{ md: 12, xl: 8 }}
          name="email"
          label="电子邮箱"
          rules={[{ type: 'email' }]}
        />
        <ProFormText
          colProps={{ md: 12, xl: 8 }}
          name="legalRepresentative"
          label="法定代表人"
        />
        <ProFormDatePicker
          colProps={{ xl: 8, md: 12 }}
          label="经营期限"
          name="validTime"
        />
        <ProFormSelect
          colProps={{ xl: 8, md: 12 }}
          label="行业类别"
          name="industryTypeId"
          allowClear
          request={getIndustryType}
          fieldProps={{
            showSearch: true,
            mode: 'multiple',
            fieldNames: {
              label: 'name',
              value: 'typeId',
            },
            optionFilterProp: 'name',
          }}
        />
        <ProFormDigit
          colProps={{ md: 12, xl: 8 }}
          name="registeredCapital"
          label="注册资本（万）"
        />
        <ProFormDatePicker
          colProps={{ xl: 8, md: 12 }}
          label="注册日期"
          name="registeredTime"
        />
        <ProFormText
          colProps={{ md: 12, xl: 8 }}
          name="registeredAddress"
          label="注册地址"
        />
        <ProFormText
          colProps={{ md: 12, xl: 8 }}
          name="registerStatus"
          label="登记状态"
        />
        <ProFormText
          colProps={{ md: 12, xl: 8 }}
          name="website"
          label="公司网址"
          rules={[
            { type: 'url', warningOnly: true },
            { type: 'string', min: 6 },
          ]}
        />
        <ProFormGroup label="企业坐标信息">
          <ProFormSelect
            colProps={{ xl: 8, md: 12 }}
            label="省级"
            name="provinceId"
            allowClear
            request={getProvince}
            fieldProps={{
              showSearch: true,
              fieldNames: {
                label: 'provinceName',
                value: 'provinceId',
              },
              optionFilterProp: 'provinceName',
            }}
          />
          <ProFormDependency name={['provinceId']}>
            {({ provinceId }) => {
              return (
                <ProFormSelect
                  colProps={{ xl: 8, md: 12 }}
                  label="市级"
                  name="cityId"
                  allowClear
                  params={{ provinceId }}
                  request={async (params) => getCity(params.provinceId)}
                  fieldProps={{
                    showSearch: true,
                    fieldNames: {
                      label: 'cityName',
                      value: 'cityId',
                    },
                    optionFilterProp: 'cityName',
                  }}
                />
              );
            }}
          </ProFormDependency>
          <ProFormDependency name={['cityId']}>
            {({ cityId }) => {
              return (
                <ProFormSelect
                  colProps={{ xl: 8, md: 12 }}
                  label="县级"
                  name="districtId"
                  params={{ cityId }}
                  allowClear
                  request={async (params) => getDistrict(params.cityId)}
                  fieldProps={{
                    showSearch: true,
                    fieldNames: {
                      label: 'districtName',
                      value: 'districtId',
                    },
                    optionFilterProp: 'districtName',
                  }}
                />
              );
            }}
          </ProFormDependency>

          <ProFormTextArea
            colProps={{ span: 24 }}
            name="address"
            label="详细地址"
          />
          <ProFormText
            colProps={{ md: 12, xl: 8 }}
            name="longitude"
            label="经度"
          />
          <ProFormText
            colProps={{ md: 12, xl: 8 }}
            name="latitude"
            label="纬度"
          />
        </ProFormGroup>
      </ProForm>
    </ProCard>
  );
};

export default AddForm;

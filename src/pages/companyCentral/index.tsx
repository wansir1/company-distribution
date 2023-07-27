import {
  ProCard,
  ProForm,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormGroup,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Col, message, Row, Space, Switch } from 'antd';
import type { FormLayout } from 'antd/lib/form/Form';
import { useState } from 'react';

const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const CompanyCentral = () => {
  const [formLayoutType, setFormLayoutType] = useState<FormLayout>(
    LAYOUT_TYPE_HORIZONTAL,
  );

  const [edit, setEdit] = useState(true);

  return (
    <ProCard>
      <Switch
        style={{ margin: '0.8rem 0' }}
        defaultChecked
        onChange={(e) => {
          setEdit(e);
          console.log(e);
        }}
        checkedChildren="开启编辑"
        unCheckedChildren="禁止编辑"
      />
      <ProForm<{
        name: string;
        company?: string;
        useMode?: string;
      }>
        layout={formLayoutType}
        grid={true}
        disabled={!edit}
        rowProps={{
          gutter: [16, formLayoutType === 'inline' ? 16 : 0],
        }}
        submitter={{
          render: (props, doms) => {
            return formLayoutType === LAYOUT_TYPE_HORIZONTAL ? (
              <Row>
                <Col span={14} offset={4}>
                  <Space>{doms}</Space>
                </Col>
              </Row>
            ) : (
              doms
            );
          },
        }}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          message.success('提交成功');
        }}
        params={{}}
        request={async () => {
          await waitTime(100);
          return {
            companyName: '蚂蚁设计有限公司',
            useMode: 'chapter',
            name: 'john',
            sex: 0,
            validTime: '2023-07-05',
            industryTypeId: ['all', 'all2'],
          };
        }}
        autoFocusFirstInput
      >
        <ProFormRadio.Group
          label="标签布局"
          radioType="button"
          fieldProps={{
            value: formLayoutType,
            onChange: (e) => setFormLayoutType(e.target.value),
          }}
          colProps={{
            span: 20,
          }}
          options={['horizontal', 'vertical', 'inline']}
        />
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
          request={async () => [
            { name: '全部', companyId: 'all' },
            { name: '什么', companyId: 'all2' },
          ]}
          fieldProps={{
            showSearch: true,
            mode: 'multiple',
            fieldNames: {
              label: 'name',
              value: 'companyId',
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
            request={async () => [
              { name: '全部', provinceId: 'all' },
              { name: '什么', provinceId: 'all2' },
            ]}
            fieldProps={{
              showSearch: true,
              fieldNames: {
                label: 'name',
                value: 'provinceId',
              },
              optionFilterProp: 'name',
            }}
          />
          <ProFormSelect
            colProps={{ xl: 8, md: 12 }}
            label="市级"
            name="cityId"
            allowClear
            request={async () => [
              { name: '全部', cityId: 'all' },
              { name: '什么', cityId: 'all2' },
            ]}
            fieldProps={{
              showSearch: true,
              fieldNames: {
                label: 'name',
                value: 'cityId',
              },
              optionFilterProp: 'name',
            }}
          />
          <ProFormSelect
            colProps={{ xl: 8, md: 12 }}
            label="县级"
            name="districtId"
            allowClear
            request={async () => [
              { name: '全部', districtId: 'all' },
              { name: '什么', districtId: 'all2' },
            ]}
            fieldProps={{
              showSearch: true,
              fieldNames: {
                label: 'name',
                value: 'districtId',
              },
              optionFilterProp: 'name',
            }}
          />
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

export default CompanyCentral;

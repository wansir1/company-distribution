import {
  ProCard,
  ProForm,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import React, { useContext } from 'react';
import { Col, message, Row, Space, Switch } from 'antd';
import { AdminInfoContext } from '@/pages/centralAdministration';
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

const PersonCentral: React.FC = () => {
  const [formLayoutType, setFormLayoutType] = useState<FormLayout>(
    LAYOUT_TYPE_HORIZONTAL,
  );
  const { userInfo } = useContext(AdminInfoContext);
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
          name="companyName"
          label="所属公司"
          tooltip="最长为 24 位"
          disabled
          placeholder="请输入名称"
        />
        <ProFormText colProps={{ md: 12, xl: 8 }} name="name" label="姓名" />
        <ProFormText colProps={{ md: 12, xl: 8 }} name="phone" label="电话" />
        <ProFormSelect
          colProps={{ xl: 8, md: 12 }}
          label="角色"
          name="role"
          disabled
          allowClear
          options={[
            { value: 1, label: '普通用户' },
            { value: 2, label: '普通管理员' },
            { value: 3, label: '超级管理员' },
          ]}
        />
        <ProFormText
          colProps={{ md: 12, xl: 8 }}
          name="position"
          label="职务"
        />
        <ProFormText
          colProps={{ md: 12, xl: 8 }}
          name="idCard"
          label="身份证"
        />
        <ProFormText colProps={{ md: 12, xl: 8 }} name="nation" label="民族" />
        <ProFormSelect
          colProps={{ xl: 8, md: 12 }}
          label="性别"
          name="sex"
          allowClear
          options={[
            { value: 0, label: '男' },
            { value: 1, label: '女' },
          ]}
        />
        <ProFormSelect
          colProps={{ xl: 8, md: 12 }}
          label="教育程度"
          name="education"
          allowClear
          options={[
            { value: 0, label: '博士生' },
            { value: 1, label: '研究生' },
            { value: 2, label: '本科生' },
            { value: 3, label: '大专生' },
            { value: 4, label: '大专以下' },
          ]}
        />
        <ProFormTextArea
          colProps={{ span: 24 }}
          name="nativePlace"
          label="详细的工作地址或家庭住址"
        />
        <ProFormDatePicker
          colProps={{ xl: 8, md: 12 }}
          label="出生日期"
          name="birthDate"
        />
        <ProFormDatePicker
          colProps={{ xl: 8, md: 12 }}
          label="入职时间"
          name="entryTime"
        />
        <ProFormSelect
          colProps={{ xl: 8, md: 12 }}
          label="职位"
          name="level"
          allowClear
          request={async () => [
            { name: '全部', companyId: 'all' },
            { name: '全部1', companyId: 'all2' },
          ]}
          fieldProps={{
            showSearch: true,
            fieldNames: {
              label: 'name',
              value: 'companyId',
            },
            optionFilterProp: 'name',
          }}
        />
      </ProForm>
    </ProCard>
  );
};

export default PersonCentral;

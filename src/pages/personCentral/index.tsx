import {
  ProCard,
  ProForm,
  ProFormDatePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { GlobalInfoContext } from '../layouts';
import React, { useContext, useRef } from 'react';
import { Col, message, Row, Space, Switch } from 'antd';
import {
  requestUserInfo,
  PersonParam,
  requestUpdateUserInfo,
} from '@/services/search';
import { isNotEmptyObj } from '@/utils/helper';
import { AdminInfoContext } from '@/pages/centralAdministration';
import type { FormLayout } from 'antd/lib/form/Form';
import { useState } from 'react';

const LAYOUT_TYPE_HORIZONTAL = 'horizontal';
type PropsType = {
  role?: number;
};
const PersonCentral: React.FC<PropsType> = (props) => {
  const [formLayoutType, setFormLayoutType] = useState<FormLayout>(
    LAYOUT_TYPE_HORIZONTAL,
  );
  const formRef = useRef<ProFormInstance>();
  const { role } = props;
  // 这里是因为用户也有这个模块，要不然不用判断直接useContext(AdminInfoContext)获取就可以了
  const { userInfo } =
    role === 1 ? useContext(GlobalInfoContext) : useContext(AdminInfoContext);

  const [edit, setEdit] = useState(true);
  const [refresh, setRefresh] = useState(false);
  console.log(userInfo, 'user info');
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
      <ProForm<PersonParam | {}>
        layout={formLayoutType}
        grid={true}
        formRef={formRef}
        disabled={!edit}
        rowProps={{
          gutter: [16, formLayoutType === 'inline' ? 16 : 0],
        }}
        submitter={{
          searchConfig: { submitText: '保存' },
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
            try {
              const data = await requestUpdateUserInfo({
                ...values,
                userId: userInfo?.userId.toString(),
                companyId: userInfo?.companyId,
              });
              if ('code' in data) {
                message.error('保存失败');
              } else {
                message.success('保存成功');
              }
              setRefresh(!refresh);
              console.log(values, 'values');
              // formRef?.current?.setFieldsValue(values);
            } catch (err) {
              console.log(err);
              message.warning('系统修复中或重新登录');
            }
          }
        }}
        params={{ refresh }}
        request={async () => {
          try {
            if (userInfo) {
              const data: PersonParam = await requestUserInfo(
                userInfo.userId.toString(),
              );
              console.log(data, 'person');
              return {
                ...data,
                companyName: userInfo.companyName,
                role: userInfo.loginRole,
              };
            }
            return {};
          } catch (e) {
            console.log(e);
            return {};
          }
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

        <ProFormSelect
          colProps={{ xl: 8, md: 12 }}
          label="角色"
          name="role"
          disabled
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
          colProps={{ md: 12, xl: 12 }}
          name="phone"
          label="电话"
          disabled
        />
        <ProFormText
          colProps={{ md: 12, xl: 12 }}
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
          name="birthday"
        />
        <ProFormDatePicker
          colProps={{ xl: 8, md: 12 }}
          label="入职时间"
          name="entryTime"
        />
        {/* <ProFormSelect
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
        /> */}
      </ProForm>
    </ProCard>
  );
};

export default PersonCentral;

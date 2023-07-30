import React, { useState } from 'react';
import type { ProSettings } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
import { history } from 'umi';
import { Dropdown } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { LoginType } from '../home/constants';
import { handleLogout } from '@/utils/helper';
import avatar from '@/assets/images/avatar.png';
import defaultProps from './constants';
import Tip from '@/components/Tip';
type UserInfo = LoginType & { loginRole: number };
const settings: ProSettings | undefined = {
  fixSiderbar: true,
  layout: 'mix',
  splitMenus: true,
};

interface DefaultValueType {
  userInfo?: UserInfo;
}
const defaultContextValue: DefaultValueType = {};
export const AdminInfoContext = React.createContext(defaultContextValue);

const CentralAdministration: React.FC = (props) => {
  const userInfo: UserInfo =
    localStorage.getItem('userInfo') &&
    JSON.parse(localStorage.getItem('userInfo')!);
  const token = localStorage.getItem('token');
  if (!token) {
    history.push(`/home`);
  }
  return (
    <AdminInfoContext.Provider value={{ userInfo }}>
      <div
        id="test-pro-layout"
        style={{
          height: '100vh',
        }}
      >
        <ProLayout
          {...defaultProps}
          title="产业信息管理中心"
          menu={{
            type: 'group',
          }}
          avatarProps={{
            src: avatar,
            size: 'small',
            title: `${userInfo?.name || '无名氏'}`,
            render: (props, dom) => {
              return (
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: 'logout',
                        icon: <LogoutOutlined rev={undefined} />,
                        label: <span onClick={handleLogout}>退出登录</span>,
                      },
                    ],
                  }}
                >
                  {dom}
                </Dropdown>
              );
            },
          }}
          menuFooterRender={(props) => {
            if (props?.collapsed) return undefined;
            return (
              <div
                style={{
                  textAlign: 'center',
                  paddingBlockStart: 12,
                }}
              >
                <div>东华理工大学</div>
                <div>@ 产业信息管理</div>
              </div>
            );
          }}
          onMenuHeaderClick={(e) => console.log(e, 'test123')}
          menuItemRender={(item, dom) => {
            if (item.comment) {
              return (
                <div
                  onClick={() => {
                    item.path && history.push(item.path);
                    console.log(item.path, item, 'path');
                  }}
                >
                  <div style={{ display: 'inline-block' }}>{dom}</div>
                  <Tip
                    content={item.comment}
                    imgStyle={{ margin: '0px 7px 2px' }}
                  ></Tip>
                </div>
              );
            }
            return (
              <div
                onClick={() => {
                  item.path && history.push(item.path);
                  console.log(item.path, item, 'path');
                }}
              >
                {dom}
              </div>
            );
          }}
          {...settings}
        >
          <PageContainer>
            <ProCard hoverable>{props.children}</ProCard>
          </PageContainer>
        </ProLayout>
      </div>
    </AdminInfoContext.Provider>
  );
};

export default CentralAdministration;

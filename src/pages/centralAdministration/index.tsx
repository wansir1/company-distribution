import React, { useState } from 'react';
import type { ProSettings } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
import { history } from 'umi';
import { Tooltip } from 'antd';
import { LoginType } from '../home/constants';
import avatar from '@/assets/images/avatar.png';
import defaultProps from './constants';
import Tip from '@/components/Tip';
const settings: ProSettings | undefined = {
  fixSiderbar: true,
  layout: 'mix',
  splitMenus: true,
};
const CentralAdministration: React.FC = (props) => {
  const userInfo: LoginType = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : '';

  return (
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
          title: '七妮妮',
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
  );
};

export default CentralAdministration;

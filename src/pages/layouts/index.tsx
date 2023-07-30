import React, { useState, useEffect } from 'react';
import { Dropdown, Layout, Menu, Spin } from 'antd';
import Map from '../../Map';
import { history, useSelector } from 'umi';
import logo from '@/assets/images/logo.png';
import routes from '@/../config/routes';
import style from './index.less';
import { UserModel } from '@/models/user';
import { LoginType } from '@/pages/home/constants';
import { handleLogout } from '@/utils/helper';

interface StateType {
  companyId: string;
  companyName: string;
}
type UserInfo = LoginType & { loginRole: number };
interface DefaultValueType {
  layoutState: StateType;
  userInfo?: UserInfo;
  setLayoutState?: React.Dispatch<React.SetStateAction<StateType>>;
}
const defaultContextValue: DefaultValueType = {
  layoutState: { companyId: '', companyName: '' },
};
const { Header, Content, Sider } = Layout;
export const GlobalInfoContext = React.createContext(defaultContextValue);
const Layouts = (props: any) => {
  // 从本地存储中获取用户信息
  const userInfo: UserInfo =
    localStorage.getItem('userInfo') &&
    JSON.parse(localStorage.getItem('userInfo')!);
  const [layoutState, setLayoutState] = useState<StateType>({
    companyId: '',
    companyName: '',
  });
  console.log(userInfo, layoutState, 'userInfo');
  const [openKey, setOpenKey] = useState(['/industry']);
  const { pathname } = location;
  const getItem = (
    label: any,
    key: any,
    icon: any,
    children: any,
    type: any,
  ) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  };

  const renderItem = (params: any, path?: any) => {
    return params.map((item) => {
      if (item.path === '*') return;
      if (item.routes) {
        return getItem(
          item.title,
          path ? path + item.path : item.path,
          '',
          renderItem(item.routes, `${path ? path + item.path : item.path}/`),
        );
      }
      return getItem(item.title, path ? path + item.path : item.path, '');
    });
  };

  const renderMenu = () => {
    return (
      <Menu
        className={style.menu}
        onClick={handleMenuClick}
        selectedKeys={pathname}
        onOpenChange={handleMenuOpen}
        defaultOpenKeys={openKey}
        mode="inline"
        items={renderItem(routes)}
      />
    );
  };

  const handleMenuClick = ({ key }: any) => {
    console.log({ key, openKey }, 'key');
    history.push(key);
    setOpenKey(openKey);
  };

  const handleMenuOpen = (key: any) => {
    setOpenKey(key);
  };

  return (
    <GlobalInfoContext.Provider
      value={{ layoutState, setLayoutState, userInfo }}
    >
      <Layout className={style.appLayout}>
        <Header>
          <div className={style.logo}>
            <img className={style.logoIcon} src={logo} alt="" />
          </div>
          <div className={style.user}>
            <Dropdown
              overlay={
                <Menu
                  items={[getItem('退出登录', 'logout')]}
                  onClick={handleLogout}
                ></Menu>
              }
            >
              <span className={style.username}>
                {userInfo
                  ? userInfo.name
                    ? userInfo.name
                    : '无名氏'
                  : '未登录'}
              </span>
            </Dropdown>
          </div>
        </Header>
        <Layout>
          <Sider theme="light" collapsible>
            {renderMenu()}
          </Sider>
          <Content>
            {pathname == '/industry/distribution' && <Map />}
            <div className={style.innerContent}>{props.children}</div>
          </Content>
        </Layout>
      </Layout>
    </GlobalInfoContext.Provider>
  );
};

export default Layouts;

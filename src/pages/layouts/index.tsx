import React, { useState, useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Dropdown, Layout, Menu, Modal, Avatar, Space } from 'antd';
import Map from '../../Map';
import { history, useSelector } from 'umi';
import logo from '@/assets/images/logo.png';
import routes from '@/../config/routes';
import style from './index.less';
import { UserModel } from '@/models/user';
import PersonCentral from '../personCentral';
import avatar from '@/assets/images/avatar.png';
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
  console.log(userInfo, layoutState, routes, 'userInfo');
  const [openKey, setOpenKey] = useState(['/industry']);
  const [isShow, setIsShow] = useState(false);
  const { pathname } = location;
  const getItem = (
    label: any,
    key: any,
    icon?: any,
    children?: any,
    type?: any,
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
        items={renderItem([routes[0]])}
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
            {/* <div
              className={style.logoIcon}
              style={{ fontSize: '20px', marginLeft: '30px' }}
            >
              北斗产业分析系统
            </div> */}
          </div>
          <div className={style.user}>
            <Dropdown
              menu={{
                items: [
                  getItem(
                    <a onClick={() => setIsShow(true)}>个人中心</a>,
                    'userInfo',
                  ),
                  getItem(<a onClick={handleLogout}>退出登录</a>, 'logout'),
                ],
              }}
            >
              <div className={style.userName}>
                <Space>
                  <Avatar src={avatar} />
                  <span className={style.username}>
                    {userInfo
                      ? userInfo.name
                        ? userInfo.name
                        : '无名氏'
                      : '未登录'}
                  </span>
                </Space>
              </div>
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
        <Modal
          open={isShow}
          footer={null}
          closeIcon={
            <span
              style={{
                fontSize: '23px',
                fontWeight: 500,
                display: 'inline-block',
                transform: 'scale(1.2,1)',
              }}
            >
              x
            </span>
          }
          width={800}
          onCancel={() => setIsShow(false)}
        >
          <PersonCentral role={1} />
        </Modal>
      </Layout>
    </GlobalInfoContext.Provider>
  );
};

export default Layouts;

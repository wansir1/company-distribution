import React, { useState, useContext, useEffect } from 'react';
import { Dropdown, Layout, Menu, Spin } from 'antd';
import Map from '../../Map';
import { history, useSelector } from 'umi';
// import { requestLoginOut } from '@/services';
import logo from '@/assets/images/logo.png';
import routes from '@/../config/routes';
// import { UserInfoContext } from '../authLayout';
import style from './index.less';

interface StateType {
  companyId: string;
  companyName: string;
}
interface DefaultValueType {
  layoutState: StateType;
  setLayoutState?: React.Dispatch<React.SetStateAction<StateType>>;
}
const defaultContextValue: DefaultValueType = {
  layoutState: { companyId: '', companyName: '' },
};
const { Header, Content, Sider } = Layout;
export const GlobalInfoContext = React.createContext(defaultContextValue);
const Layouts = (props: any) => {
  //   const { map } = useSelector(({ map }) => ({
  //     ...map,
  //   }));
  //   const userInfo = useContext(UserInfoContext);
  const userInfo = null;
  const [layoutState, setLayoutState] = useState<StateType>({
    companyId: '',
    companyName: '',
  });
  const [openKey, setOpenKey] = useState(['/industry']);
  const { pathname } = location;
  const handleLogout = async () => {
    console.log(routes, 'fs');
    // await requestLoginOut();
    // window.location.reload();
  };

  // if (userInfo === null) {
  //   return <Spin size="large" tip="认证中..." />;
  // }
  //   useEffect(() => {
  //     window.addEventListener('unhandledrejection', function (event) {
  //       console.log('event', event);
  //       console.log('message', event.message);
  //       event.preventDefault();
  //     });
  //   }, []);
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
    <GlobalInfoContext.Provider value={{ layoutState, setLayoutState }}>
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
                {userInfo ? userInfo.name : '未登录'}
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

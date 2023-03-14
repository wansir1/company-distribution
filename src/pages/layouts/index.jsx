import React, { useState, useContext } from 'react';
import { Dropdown, Layout, Menu, Spin } from 'antd';
import Map from '../../Map';
import { history, useSelector } from 'umi';
// import { requestLoginOut } from '@/services';
import logo from '@/assets/images/logo.png';
import routes from '@/../config/routes'
// import { UserInfoContext } from '../authLayout';
import style from './index.less';

const { Header, Content, Sider } = Layout;

const Layouts = (props) => {
  //   const { map } = useSelector(({ map }) => ({
  //     ...map,
  //   }));
  //   const userInfo = useContext(UserInfoContext);
  const userInfo = null;
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

  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  };

  const renderItem = (params, path) => {
    return params.map((item) => {
      if (item.path === '*') return;
      if (item.routes) {
        return getItem(
          item.title,
          path ? path + item.path : item.path,
          '',
          renderItem(item.routes, `${item.path}/`),
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

  const handleMenuClick = ({ key }) => {
    console.log({key,openKey},'key')
    history.push(key);
    setOpenKey(openKey);
  };

  const handleMenuOpen = (key) => {
    setOpenKey(key);
    
  };
console.log({ pathname });
  return (
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
  );
};

export default Layouts;

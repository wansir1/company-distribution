import React, { ReactNode } from 'react';
interface IProps {
  children?: ReactNode;
}
const Layout = (props: IProps) => {
  return <div style={{ color: 'green' }}>{props?.children}</div>;
};

export default Layout;

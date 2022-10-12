import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode, useState } from 'react';
import styles from './index.module.less';

const { Header, Content, Footer } = Layout;

const NavItems = [
  {
    label: '首页',
    key: '/',
    path: '/'
  },
  {
    label: '在线播放',
    key: '/play',
    path: '/play',
  },
  {
    label: '编辑工作台',
    key: '/edit',
    path: '/edit',
  },
];

interface IProps {
  children: ReactNode;
}

const MainLayout: React.FC<IProps> = (props) => {
  const router = useRouter();

  const [activeMenuItemKey, setActiveMenuItemKey] = useState(router.pathname);

  return (
    <Layout className={styles.main_layout}>
      <Header style={{ height: 40, lineHeight: '40px' }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[activeMenuItemKey]}
          items={NavItems.map((item, idx) => ({
            key: item.key,
            label: <Link href={item.path}>{item.label}</Link>,
          }))}
        ></Menu>
      </Header>
      <div style={{ minHeight: 'calc(100vh - 72px)', paddingBottom: 24 }}>
        {props.children}
      </div>
      <Footer
        style={{
          textAlign: 'center',
          height: 32,
          padding: '8px',
          lineHeight: '16px',
        }}
      >
        VIDEO & AUDIO Tools build by @WebAssebmly and @FFmpeg
      </Footer>
    </Layout>
  );
};

export default MainLayout;

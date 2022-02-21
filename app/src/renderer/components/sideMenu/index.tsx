import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import UserAvator from './UserAvator';

const SideMenu = () => {
  return (
    <div style={{ width: '12%' }}>
      <Menu mode="inline">
        <Menu.Item key="/net">
          <Link to="/net">数据包流</Link>
        </Menu.Item>
        <Menu.Item key="/req">
          <Link to="/req">请求管理</Link>
        </Menu.Item>
        <Menu.Item key="/software">
          <Link to="/software">软件生命周期管理</Link>
        </Menu.Item>
        <Menu.Item key="/analyse">
          <Link to="/analyse">反解析</Link>
        </Menu.Item>
      </Menu>
      <UserAvator />
    </div>
  );
};

export default SideMenu;

import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import LoginState from '../loginState';

const UserAvator = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: 20, left: '2%' }}>
      <Avatar icon={<UserOutlined />} />
      <Button type="link" onClick={() => setVisible(true)}>
        请登录
      </Button>
      <LoginState visible={visible} setVisible={setVisible} />
    </div>
  );
};

export default UserAvator;

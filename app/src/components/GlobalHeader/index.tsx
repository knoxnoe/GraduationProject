import { Menu } from 'antd';
import { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { MENU_ITEM } from '@/constants';

const items: MenuProps['items'] = [
  {
    label: '本地播放',
    key: MENU_ITEM.Display,
    icon: <MailOutlined />,
  },
  {
    label: '音视频处理',
    key: MENU_ITEM.Deal,
    icon: <AppstoreOutlined />,
  },
  {
    label: '分析',
    key: MENU_ITEM.Analysize,
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
];

const GlobalHeader = () => {

  const onMenuActiveChange = (menu) => {
    setActiveKeys(menu.keyPath);
  }

  const [activeKeys, setActiveKeys] = useState<MENU_ITEM>(MENU_ITEM.Display);


  return <Menu onClick={onMenuActiveChange} selectedKeys={[activeKeys]} mode="horizontal" items={items} />
}

export default GlobalHeader;

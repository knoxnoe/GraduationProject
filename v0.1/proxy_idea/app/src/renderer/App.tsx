import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import { Button, Menu } from 'antd';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Provider } from 'react-redux';
import Net from './pages/net/index';
import SideMenu from './components/sideMenu/index';
import Req from './pages/req/index';
import Analyse from './pages/analyse/index';
import SoftWare from './pages/software/index';
import { useEffect } from 'react';
import { store } from './store';

const Hello = () => {
  return (
    <div className="Hello">
      <div className="gg">home</div>
    </div>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="layout">
          <SideMenu />
          <div className="main">
            <Routes>
              <Route path="/" element={<Hello />} />
              <Route path="/net" element={<Net />} />
              <Route path="/req" element={<Req />} />
              <Route path="/software" element={<SoftWare />} />
              <Route path="/analyse" element={<Analyse />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

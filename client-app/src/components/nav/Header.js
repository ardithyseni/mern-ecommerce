import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
// import { auth } from "../../firebase";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  let dispatch = useDispatch();
  let {user} = useSelector((state) => ({...state}));
  console.log(user)
  let history = useHistory();

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  const logout = () => {
    const auth = getAuth();
    auth.signOut();
    dispatch({
      type: "LOGOUT",
      payload: null
    });

    history.push('/login');
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>)}

      {user && (
        <SubMenu icon={<SettingOutlined />} title={user.email && user.email.split('@')[0]} className="float-right">
          
          {user && user.role === 'subscriber' && (
            <Item>
              <Link to ='/user/history'>Dashboard</Link>
            </Item>
          )}

          {user && user.role === 'admin' && (
            <Item>
              <Link to ='/admin/dashboard'>Dashboard</Link>
            </Item>
          )}
          
          <Item icon={<LogoutOutlined />} onClick={logout}>Logout</Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;

import React, { useState } from "react";
import { auth } from "../../firebase";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  const handleSubmit = async (e) => {

    e.preventDefault();

  };

  const loginForm = () => (

    <form onSubmit={handleSubmit}>

      <div className="form-group">
        <input
          type="email"
          className="form-control"
          placeholder="Your e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>


      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        block
        size="large"
        shape="round"
        icon={<MailOutlined />}
        className="mb-3"
        disabled={!email || password.length < 6}
      >
        Login
      </Button>
    </form>
  );


  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Log in</h4>

          {loginForm()}
        </div>
      </div>
    </div>
  )
}


export default Login
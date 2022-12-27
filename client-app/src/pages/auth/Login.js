import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { getAuth, GoogleAuthProvider, sendSignInLinkToEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined, LoadingOutlined, GoogleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Login = ({ history }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
      if (user && user.token) history.push('/');
  }, [user]);

  const googleProvider = new GoogleAuthProvider();

  const auth = getAuth();

  let dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loginResult = await signInWithEmailAndPassword(auth, email, password)
      // console.log(loginResult);
      const { user } = loginResult;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        }
      });
      history.push('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }

  };

  const googleLogin = async () => {
    signInWithPopup(auth, googleProvider).then(async (result) => {
      console.log("46 erdh");
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        }
      });
      history.push('/');
    })
    .catch(error => {
      console.log(error)
      toast.error(error.message)
    });
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
        icon={loading ? <LoadingOutlined /> : <MailOutlined />}
        className="mb-2"
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

          <Button
            onClick={googleLogin}
            type="default"
            block
            size="large"
            shape="round"
            icon={<GoogleOutlined />}
            className="mb-3"
          // disabled={!email || password.length < 6}
          >
            Login with Google
          </Button>
          <Link to="/passwordreset" className="float-right text-danger">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  )
}


export default Login
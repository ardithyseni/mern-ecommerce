import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { getAuth, sendSignInLinkToEmail, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";


const createOrUpdateUser = async (idToken) => {
  return await axios.post(`${process.env.REACT_APP_API}/create-or-update-user`,
    {
      idToken: idToken
    })
}


const Register = ({ history }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push('/');
  }, [user]);


  const auth = getAuth();

  // const handleSubmit = async (e) => {

  //   e.preventDefault();
  //   // console.log("ENV --->", process.env.REACT_APP_REGISTER_REDIRECT_URL);
  //   const actionCodeSettings = {
  //     url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
  //     handleCodeInApp: true,
  //   };

  //   await sendSignInLinkToEmail(auth, email, actionCodeSettings)
  //   toast.success(
  //     `Email is sent to ${email}. Click the link in your email to complete the registration.`
  //   );
  //   // save user's email in local storage
  //   window.localStorage.setItem("emailForRegistration", email);
  //   // clear state
  //   setEmail("");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
    
    let user = auth.currentUser;

    const idTokenResult = await user.getIdTokenResult();
    
    createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            }
          });
        })
        .catch((error) => console.log(error));

    history.push('/');
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        placeholder="Your e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />

      <input
        style={{ marginTop: '5px' }}
        type="password"
        className="form-control"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />
      <br />
      <Button onClick={handleSubmit} type="primary" block size="large">
        Register
      </Button>
    </form>
  );


  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>

          {registerForm()}
        </div>
      </div>
    </div>
  )
}

export default Register
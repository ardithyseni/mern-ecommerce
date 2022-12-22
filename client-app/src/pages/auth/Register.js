import React, { useState } from "react";
// import { auth } from "../../firebase";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { toast } from 'react-toastify';

const Register = () => {

  const [email, setEmail] = useState("");

  const auth = getAuth();
  const handleSubmit = async (e) => {

    e.preventDefault();
    // console.log("ENV --->", process.env.REACT_APP_REGISTER_REDIRECT_URL);
    const actionCodeSettings  = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
    toast.success(
      `Email is sent to ${email}. Click the link in your email to complete the registration.`
    );
    // save user's email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    // clear state
    setEmail("");
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />

      <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">
        Register
      </button>
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
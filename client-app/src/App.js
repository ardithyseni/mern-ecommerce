import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import Home from './pages/Home';
import Header from './components/nav/Header';
import ForgotPassword from './pages/auth/ForgotPassword';
import { getCurrentUser } from './functions/authFunctions';


const App = () => {

  const dispatch = useDispatch();

  // to check firebase auth check
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log('IDTOKENRESULLTTTTWE1231231', idTokenResult);
        console.log("user: ", user);
        // dispatch({
        //   // type & payload
        //   type: 'LOGGED_IN_USER',
        //   payload: {
        //     email: user.email,
        //     token: idTokenResult.token,
        //   }
        // });
        getCurrentUser(idTokenResult.token)
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
      }
    })
    // clean up
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>

        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/passwordreset" component={ForgotPassword} />
      </Switch>
    </>
  );
}

export default App;

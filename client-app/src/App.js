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
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';
import UserHistory from './pages/user/UserHistory';
import UserWishlist from './pages/user/UserWishlist';
import UserPassword from './pages/user/UserPassword';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import CreateSubcategory from './pages/admin/subcategory/CreateSubcategory';
import UpdateSubcategory from './pages/admin/subcategory/UpdateSubcategory';
import ProductCreate from './pages/admin/product/ProductCreate';
import AllProducts from './pages/admin/product/AllProducts';
import ProductUpdate from './pages/admin/product/ProductUpdate';
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
  }, [auth, dispatch]);

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
        <UserRoute exact path="/user/history" component={UserHistory} />
        <UserRoute exact path="/user/password" component={UserPassword} />
        <UserRoute exact path="/user/wishlist" component={UserWishlist} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/subcategory" component={CreateSubcategory} />
        <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
        <AdminRoute exact path="/admin/subcategory/:slug" component={UpdateSubcategory} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
      </Switch>
    </>
  );
}

export default App;

import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getCurrentUser } from "./functions/authFunctions";
import { Space, Spin } from "antd";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Home from "./pages/Home";
// import Header from "./components/nav/Header";
// import SideDrawer from "./components/drawer/SideDrawer";

// import RegisterComplete from "./pages/auth/RegisterComplete";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import History from "./pages/user/History";
// import UserRoute from "./components/routes/UserRoute";
// import AdminRoute from "./components/routes/AdminRoute";
// import Password from "./pages/user/Password";
// import Wishlist from "./pages/user/Wishlist";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import CategoryCreate from "./pages/admin/category/CategoryCreate";
// import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
// import SubCreate from "./pages/admin/sub/SubCreate";
// import SubUpdate from "./pages/admin/sub/SubUpdate";
// import ProductCreate from "./pages/admin/product/ProductCreate";
// import AllProducts from "./pages/admin/product/AllProducts";
// import ProductUpdate from "./pages/admin/product/ProductUpdate";
// import Product from "./pages/Product";
// import CategoryHome from "./pages/category/CategoryHome";
// import SubHome from "./pages/sub/SubHome";
// import Shop from "./pages/Shop";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import CreateCouponPage from "./pages/admin/coupon/CreateCouponPage";
// import Payment from "./pages/Payment";

// using lazy
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/nav/Header"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const UserHistory = lazy(() => import("./pages/user/UserHistory"));
const UserWishlist = lazy(() => import("./pages/user/UserWishlist"));
const UserPassword = lazy(() => import("./pages/user/UserPassword"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const CategoryCreate = lazy(() =>
  import("./pages/admin/category/CategoryCreate")
);
const CategoryUpdate = lazy(() =>
  import("./pages/admin/category/CategoryUpdate")
);
const CreateSubcategory = lazy(() =>
  import("./pages/admin/subcategory/CreateSubcategory")
);
const UpdateSubcategory = lazy(() =>
  import("./pages/admin/subcategory/UpdateSubcategory")
);
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const AllProducts = lazy(() => import("./pages/admin/product/AllProducts"));
const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubCategoryHome = lazy(() =>
  import("./pages/subcategory/SubCategoryHome")
);
const ShopPage = lazy(() => import("./pages/ShopPage"));
const Cart = lazy(() => import("./pages/Cart"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CreateCouponPage = lazy(() =>
  import("./pages/admin/coupon/CreateCouponPage")
);
const PaymentPage = lazy(() => import("./pages/PaymentPage"));

const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("IDTOKENRESULLTTTTWE1231231", idTokenResult);
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
              },
            });
          })
          .catch((error) => console.log(error));
      }
    });
    // clean up
    return () => unsubscribe();
  }, [auth, dispatch]);

  return (
    <>

      <Suspense
        fallback={
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
          }}>
            <Spin tip="Loading..." size="large">
            </Spin>
          </div>
        }
      >
        <Header />
        <ToastContainer />
        <SideDrawer />
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
          <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />

          <Route exact path="/product/:slug" component={ProductDetails} />
          <Route exact path="/category/:slug" component={CategoryHome} />
          <Route exact path="/subcategory/:slug" component={SubCategoryHome} />

          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/payment" component={PaymentPage} />

        </Switch>
      </Suspense>
    </>
  );
};

export default App;

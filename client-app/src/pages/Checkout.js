import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  emptyUserCart,
  getUserCart,
  saveUserAddress,
} from "../functions/userFunctions";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [savedAddress, setSavedAddress] = useState(false);
  const [coupon, setCoupon] = useState('');

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user?.token).then((res) => {
      console.log("user cart response", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, [user]);

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }

    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    // remove from backend
    emptyUserCart(user?.token).then((res) => {
      setProducts([]);
      setTotal(0);
      toast.success("Cart emptied. Continue shopping");
    });
  };

  const saveAddressToDb = () => {
    // console.log(address);
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setSavedAddress(true);
        toast.success("Your address is saved");
      }
    });
  };

  const showAddress = () => {
    return (
      <>
        <ReactQuill theme="snow" value={address} onChange={setAddress} />
        <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
          Save
        </button>
      </>
    );
  };

  const showProductSummary = () => {
    {
      products.map((p, i) => (
        <div key={i}>
          <p>{p.product.title}</p>
        </div>
      ));
    }
  };

  const showApplyCouponInput = () => {
    return (
      <>
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="form-control"
        />
        <button onClick={handleApplyCoupon} className="btn btn-primary mt-2">Apply Coupon</button>
      </>
    );
  };

  const handleApplyCoupon = () => {
    console.log('coupon to send', coupon);
  }

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        {showAddress()}
        <hr />
        <h4>Got a coupon?</h4>
        <br />
        {showApplyCouponInput()}
      </div>

      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>{products.length} Products</p>
        <hr />
        {showProductSummary()}
        <div className="row">
          <div className="col-md-6">
            <button
              disabled={!savedAddress || !products.length}
              className="btn btn-primary"
            >
              Place Order
            </button>
          </div>

          <div className="col-md-6">
            <button
              disabled={!products.length}
              onClick={emptyCart}
              className="btn btn-primary"
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

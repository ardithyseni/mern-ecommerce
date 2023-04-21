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
import { applyCoupon } from "../functions/couponFunctions";

const Checkout = ({history}) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [savedAddress, setSavedAddress] = useState(false);
  const [couponValue, setCouponValue] = useState('');
  // discount calculation
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user?.token).then((res) => {
      console.log("user cart response", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      console.log(products);
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
      setTotalAfterDiscount(0);
      setCouponValue("")
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
        <button disabled={!address.length} className="btn btn-primary mt-2" onClick={saveAddressToDb}>
          Save
        </button>
      </>
    );
  };

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <h6 className="py-2">
          {p.product.title} ({p.product.color}) x {p.count} = {" "}
          {p.product.price * p.count} €
        </h6>
      </div>
    ));


  const showApplyCouponInput = () => {
    return (
      <>
        <input
          type="text"
          value={couponValue}
          onChange={(e) => {
            setCouponValue(e.target.value.toUpperCase()) // Convert input to uppercase
            setDiscountError("");
          }}
          className="form-control"
        />
        <button disabled={!couponValue.length} onClick={handleApplyCoupon} className="btn btn-primary mt-2">Apply Coupon</button>
      </>
    );
  };

  const handleApplyCoupon = () => {
    // console.log('coupon to send', coupon);
    applyCoupon(couponValue, user.token).then((res) => {
      console.log('Res on coupon applied', res.data)
      if (res.data) {
        setTotalAfterDiscount(res.data)
        // update coupon applied to redux
        dispatch({
          type: "COUPON_APPLIED",
          payload: true
        })
      }
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update coupon applied to redux
        dispatch({
          type: "COUPON_APPLIED",
          payload: false
        })
      }
    })
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
        <br />
        {discountError && <p className="text-danger p-2">{discountError}</p>}
      </div>

      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>{products.length} Products</p>
        <hr />
        {showProductSummary()}
        <hr />
        <h5>Cart Total: {total} €</h5>
        <br />
        {totalAfterDiscount > 0 && (
          <h5>Discounted price: {totalAfterDiscount} €</h5>
        )}
        <div className="row">
          <div className="col-md-6">
            <button
              disabled={!savedAddress || !products.length}
              className="btn btn-primary"
              onClick={() => history.push('/payment')}
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

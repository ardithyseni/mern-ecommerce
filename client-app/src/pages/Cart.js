import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const history = useHistory();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    //
  };

  const handleLogin = () => {
    history.push({
      pathname: "/login",
      state: { from: "/cart" },
    });
  };

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart.length} products</h4>
          {!cart.length ? (
            <p>
              No products. <Link to="/">Continue Shopping.</Link>
            </p>
          ) : (
            "show cart items"
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <h6>
                {c.title} x {c.count} = {c.price * c.count} €
              </h6>
            </div>
          ))}
          <hr />
          Total: <b>{getTotal()} €</b>
          <hr />
          {user ? (
            <button
              onClick={saveOrderToDb}
              disabled={!cart.length}
              className="btn btn-sm btn-primary mt-2"
            >
              Proceed to Checkout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="btn btn-sm btn-primary mt-2"
            >
              Log in to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProductTableRow from "../components/cards/ProductTableRow";
import { userCart } from "../functions/userFunctions";

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
    // console.log('cart' , JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log("cart post response", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((error) => {
        console.log("cart save error", error);
      });
  };

  const showCartItems = () => {
    return (
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Color</th>
            <th scope="col">Count</th>
            <th scope="col">Shipping</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((p) => (
            <ProductTableRow key={p._id} p={p} />
          ))}
        </tbody>
      </table>
    );
  };

  const handleLogin = () => {
    localStorage.setItem("cartpage", "cart");
    history.push("/login");
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
            showCartItems()
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

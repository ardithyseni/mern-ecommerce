import React from "react";
import ModalImage from "react-modal-image";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const ProductTableRow = ({ p }) => {
  const dispatch = useDispatch();

  const handleCountChange = (e) => {
    let itemCount = e.target.value < 1 ? 1 : e.target.value;

    if (itemCount > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = itemCount;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemoveItem = () => {
    //
    console.log(p._id, "to remove");

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <tr>
      <td>
        <div style={{ width: "100px", height: "auto" }}>
          {p.images.length ? (
            <ModalImage small={p.images[0].url} large={p.images[0].url} />
          ) : (
            "No image found"
          )}
        </div>
      </td>
      <td>{p.title}</td>
      <td>{p.price}</td>
      <td>{p.brand}</td>
      <td>{p.color}</td>
      <td className="text-center">
        <input
          type="number"
          className="form-control"
          value={p.count}
          onChange={handleCountChange}
        />
      </td>
      <td className="text-center">
        {p.shipping === "Yes" ? (
          <CheckCircleOutlined
            className="text-center text-success"
            style={{ fontSize: "23px" }}
          />
        ) : (
          <CloseCircleOutlined
            className="text-center text-danger"
            style={{ fontSize: "23px" }}
          />
        )}
      </td>
      <td className="text-center">
        <CloseOutlined
          style={{ cursor: "pointer", fontSize: "23px" }}
          className="text-danger"
          onClick={handleRemoveItem}
        />
      </td>
    </tr>
  );
};

export default ProductTableRow;

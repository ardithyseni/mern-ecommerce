import React from "react";
import { Drawer } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  const drawerImageStyle = {
    width: "100%",
    height: "80px",
    objectFit: "contain",
    border: '1px solid darkgray',
  };

  return (
    <Drawer
      className="text-center"
      title={`Cart | ${cart.length} ${
        cart.length === 1 ? "Product" : "Products"
      }`}
      placement="right"
      onClose={() => {
        dispatch({
          type: "SET_DRAWER_VISIBLE",
          payload: false,
        });
      }}
      visible={drawer}
    >
      {cart.map((p) => (
        <div key={p._id} className="row my-4">
          <div className="col">
            <img src={p.images[0].url} alt="" style={drawerImageStyle} />
            <p className="text-center bg-secondary text-light">{p.title} x {p.count}</p>
          </div>
        </div>
      ))}
      <Link to='/cart'>
        <button onClick={() => dispatch({
          type: "SET_DRAWER_VISIBLE",
          payload: false,
        })}
         className="text-center btn btn-primary btn-raised btn-block mt-5"
        >
            Go To Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;

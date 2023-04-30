import React, { useEffect, useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getUserWishlist,
  removeFromUserWishlist,
} from "../../functions/userFunctions";
import { DeleteOutlined } from "@ant-design/icons";

const UserWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () =>
    getUserWishlist(user?.token).then((res) => {
      console.log(res);
      setWishlist(res.data.wishlist);
    });

  const handleRemoveWishlist = (productId) =>
    removeFromUserWishlist(productId, user?.token).then((res) => {
      loadWishlist();
    });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col d-flex flex-wrap">
          <h4 className="w-100 mb-4">Wishlist</h4>
          {wishlist.map((w) => (
            <div key={w._id} className="card m-3" style={{ width: "253px" }}>
              <img
                className="card-img-top border-bottom"
                src={w.images[0].url}
                alt="Card image cap"
                style={{
                  objectFit: "contain",
                  width: "250px",
                  height: "250px",
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{w.title}</h5>
                <p className="card-text">{w.price} €</p>
                <button
                  className="btn btn-outline-danger btn-sm mr-1"
                  onClick={() => handleRemoveWishlist(w._id)}
                >
                  <DeleteOutlined className="text-danger" /> Remove
                </button>
                <Link
                  to={`/product/${w.slug}`}
                  className="btn btn-primary btn-sm ml-1"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserWishlist;

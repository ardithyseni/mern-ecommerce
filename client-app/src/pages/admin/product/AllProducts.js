import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount, deleteProduct } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { Modal, Button, Spin } from "antd";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify'



const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  
  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(24)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  // const showModal = () => {
  //   setOpen(true);
  //   console.log("show modal triggered", open);
  // };

  // const handleCancelModal = () => {
  //   setOpen(false);
  // };

  const handleRemoveProduct = async (slug) => {
    console.log(slug);

    deleteProduct(slug, user.token)
    .then((res) => {
      console.log(res);
      loadAllProducts();
      toast.success(`Deleted ${res.data.title}`);
    }).catch((err) => {
      toast.error(err.response.data);
      console.log(err);
    })
  };

  return (
    <>


      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>

          <div className="col-md-10">
            <h4>All Products</h4>
            
              <div className="row d-flex flex-wrap">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="col-md-4 mb-4 mt-4"
                  >
                    <AdminProductCard
                      product={product}
                      loading={loading}
                      handleRemoveProduct={handleRemoveProduct}
                    />

                  </div>
                ))}
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;

import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount, deleteProduct } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { Modal, Button } from "antd";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const handleRemoveProduct = (slug) => {
    console.log("send delete request", slug);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>All Products</h4>
          )}
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
                  handleCancelModal={handleCancelModal}
                  showModal={showModal}
                />
              </div>
            ))}
            <Modal
              open={isModalOpen}
              title="Delete product?"
              onOk={handleRemoveProduct}
              onCancel={handleCancelModal}
              footer={[
                <Button key="back" onClick={handleCancelModal}>
                  Back
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleRemoveProduct}>
                  Submit
                </Button>,
              ]}
            >
        
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;

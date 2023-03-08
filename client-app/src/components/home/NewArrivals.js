import { Skeleton, Card, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import ProductCard from "../cards/ProductCard";
import { getProductsByCount, getProductsByFilter, countProducts } from "../../functions/product";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [pageNumber]);

  useEffect(() => {
    countProducts().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // getProductsByFilter(sort, order, limit)
    getProductsByFilter('createdAt', 'desc', pageNumber).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="container">
        {loading ? (
          // Render the Card with the Skeleton three times
          <div className="row">
            {[...Array(3)].map((_, index) => (
              <div className="col-md-4" key={index}>
                <Card style={{ width: 300 }}>
                  <Skeleton active loading={loading}></Skeleton>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4" key={product._id}>
                <ProductCard product={product} loading={loading} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={pageNumber}
            total={(productsCount / 3) * 10}
            onChange={value => setPageNumber(value)}
          />
        </nav>
      </div>
    </>
  );
};

export default NewArrivals;

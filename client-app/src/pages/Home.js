import { Skeleton, Card } from "antd";
import React, { useEffect, useState } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import ProductCard from "../components/cards/ProductCard";
import { getProductsByCount } from "../functions/product";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(3).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="jumbotron h1 font-weight-bold text-primary text-center">
        <Jumbotron text={["The best in tech", "Buy online"]} />
      </div>

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
    </>
  );
};

export default Home;

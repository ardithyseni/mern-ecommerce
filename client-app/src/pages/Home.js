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
        getProductsByCount(3).then((res) => {
            setProducts(res.data);
        });
    };

    return (
        <>
            <div className="jumbotron">
              <Jumbotron text={["The best in tech", "Buy online"]} />
            </div>

            <div className="container">
                <div className="row">
                    {products.map((product) => (
                        <div className="col-md-4" key={product._id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;

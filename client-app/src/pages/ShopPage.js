import React, { useEffect, useState } from "react";
import { getProductsByCount, fetchProductsByFilter } from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Spin, Card, Skeleton } from "antd";

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    let { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    useEffect(() => {
        loadAllProducts();
    }, []);


    // first way: load products on page load by default
    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(12).then((res) => {
            setProducts(res.data);
            setLoading(false);
        });
    };

    // load products on user search input
    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({ query: text });
        }, 1000)
        return () => clearTimeout(delayed)
    }, [text])

    const fetchProducts = (arg) => {
        setLoading(true);
        fetchProductsByFilter(arg).then((res) => {
            setProducts(res.data);
        })
        setLoading(false);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">Search/filter menu</div>
                <div className="col-md-9">
                    {loading ? (
                        // Render the Card with the Skeleton 12 times
                        <div className="row py-5">
                            {[...Array(12)].map((_, index) => (
                                <div className="col-md-4 mt-5" key={index}>
                                    <Card style={{ width: 300 }}>
                                        <Skeleton
                                            active
                                            loading={loading}
                                        ></Skeleton>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="row py-5">
                            {products.map((p) => (
                                <div key={p._id} className="col-md-4 mt-5">
                                    <ProductCard
                                        product={p}
                                        loading={loading}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShopPage;

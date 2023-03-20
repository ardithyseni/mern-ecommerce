import React, { useEffect, useState } from "react";
import {
    getProductsByCount,
    fetchProductsByFilter,
} from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Spin, Card, Skeleton, Menu, Slider } from "antd";
import { EuroOutlined } from "@ant-design/icons";

const { SubMenu, ItemGroup } = Menu;

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [priceChange, setPriceChange] = useState(false);

    let dispatch = useDispatch();
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
        }, 1000);
        return () => clearTimeout(delayed);
    }, [text]);

    const fetchProducts = (arg) => {
        setLoading(true);
        fetchProductsByFilter(arg).then((res) => {
            setProducts(res.data);
        });
        setLoading(false);
    };

    // 3. load products based on price range 
    useEffect(() => {
        console.log("ok price change")
        fetchProducts({ price });
    }, [priceChange])

    const handlePriceSlider = (value) => {
        // dispatch({
        //     type: "SEARCH_QUERY",
        //     payload: { text: "" },
        // });

        setPrice(value);
        setTimeout(() => {
            setPriceChange(!priceChange)
        }, 800);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 pt-2">
                    {/* Search & Filter Menu */}
                    <h4>Search / Filter</h4>
                    <hr />
                    <Menu defaultOpenKeys={["1", "2"]} mode="inline">
                        <SubMenu
                            key="1"
                            title={
                                <span className="h6">
                                    <EuroOutlined /> Price
                                </span>
                            }
                        >
                            <div>
                                <Slider
                                    range
                                    className="ml-4 mr-4"
                                    tipFormatter={(v) => `${v} €`}
                                    value={price}
                                    onChange={handlePriceSlider}
                                    max="3999"
                                />
                            </div>
                        </SubMenu>
                    </Menu>
                </div>
                <div className="col-md-9 pt-2">
                            <h4>Products</h4>
                    {loading ? (
                        // Render the Card with the Skeleton 12 times
                        <div className="row py-3">
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
                        <div className="row py-3">
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

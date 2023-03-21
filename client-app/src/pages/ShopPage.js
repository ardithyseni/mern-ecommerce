import React, { useEffect, useState } from "react";
import {
    getProductsByCount,
    fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "../components/cards/ProductCard";
import { Spin, Card, Skeleton, Menu, Slider, Checkbox, Tag } from "antd";
import {
    EuroOutlined,
    UnorderedListOutlined,
    StarOutlined,
} from "@ant-design/icons";
import StarFilter from "../components/forms/StarFilter";
import StarRatings from "react-star-ratings";
import { getSubcategories } from '../functions/subcategory';

const { SubMenu, ItemGroup } = Menu;

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 3999]);
    const [priceChange, setPriceChange] = useState(false);
    const [categories, setCategories] = useState([]); // to show the categories in the sidebar
    const [categoryIds, setCategoryIds] = useState([]); // used to send to the backend
    const [star, setStar] = useState(0);
    const [subcategories, setSubcategories] = useState([]);
    const [subcategory, setSubcategory] = useState("");

    let dispatch = useDispatch();
    let { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    useEffect(() => {
        loadAllProducts();
        // fetch categories one liner
        getCategories().then((res) => setCategories(res.data));
        // fetch subcategories
        getSubcategories().then((res) => setSubcategories(res.data));
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
        console.log("ok price change");
        fetchProducts({ price });
    }, [priceChange]);

    const handlePriceSlider = (value) => {
        // dispatch({
        //     type: "SEARCH_QUERY",
        //     payload: { text: "" },
        // });

        setPrice(value);
        setTimeout(() => {
            setPriceChange(!priceChange);
        }, 800);
    };

    // load products based on category
    // show categories in a checkbox list
    const showCategories = () =>
        categories.map((c) => (
            <div key={c._id}>
                <Checkbox
                    className="pb-2 pl-4 pr-4"
                    onChange={handleCheckbox}
                    value={c._id}
                    name="category"
                    checked={categoryIds.includes(c._id)}
                >
                    {c.name}
                </Checkbox>
                <br />
            </div>
        ));

    const handleCheckbox = (e) => {
        let intheState = [...categoryIds];
        let justChecked = e.target.value;
        let foundInTheState = intheState.indexOf(justChecked); // index or if not found -1

        if (foundInTheState === -1) {
            intheState.push(justChecked);
        } else {
            intheState.splice(foundInTheState, 1);
        }

        setCategoryIds(intheState);
        // console.log(intheState);

        if (intheState.length === 0) {
            loadAllProducts();
        } else {
            setLoading(true);
            fetchProducts({ category: intheState });
            setLoading(false);
        }
    };

    // show products by average star rating

    const handleStarClick = (newRating, name) => {
        if (newRating === 0) {
            loadAllProducts();
        }
        setStar(newRating);
        fetchProducts({ stars: newRating })
    };

    const showStarRating = () => (
        <div className="pb-2 pl-4 pr-4">
            <StarRatings
                changeRating={handleStarClick}
                rating={star}
                starDimension="22px"
                starSpacing="4px"
                starRatedColor="rgb(24, 144, 255)"
                starHoverColor="rgb(24, 144, 255)"
                numberOfStars={5}
            />
        </div>
    );



    const showSubcategories = () => {
        return (subcategories.map((s) => 
        <Tag color="blue" onClick={() => handleClickSubcategory(s)} style={{ margin: '5px', cursor: 'pointer' }} key={s._id}>
            {s.name}
        </Tag>))
    }

    const handleClickSubcategory = (s) => {
        // console.log('sub clicked', s.name);
        setSubcategory(s)
        setCategoryIds([]);
        fetchProducts({ subcategory: s})
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 pt-2">
                    {/* Search & Filter Menu */}
                    <h4>Search / Filter</h4>
                    <hr />
                    <Menu defaultOpenKeys={["1", "2", "3", "4", "5", "6"]} mode="inline">
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

                        <SubMenu
                            key="2"
                            title={
                                <span className="h6">
                                    <UnorderedListOutlined /> Categories
                                </span>
                            }
                        >
                            <div>{showCategories()}</div>
                        </SubMenu>

                        <SubMenu
                            key="3"
                            title={
                                <span className="h6">
                                    <StarOutlined /> Rating
                                </span>
                            }
                        >
                            <div>{showStarRating()}</div>
                        </SubMenu>

                        <SubMenu
                            key="4"
                            title={
                                <span className="h6">
                                    <UnorderedListOutlined /> Subcategories
                                </span>
                            }
                        >
                            <div>{showSubcategories()}</div>
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

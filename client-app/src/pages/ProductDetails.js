import React, { useEffect, useState } from "react";
import {
    getProductBySlug,
    rateProductFunction,
    getRelated,
} from "../functions/product";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Card, Skeleton, Tabs, Descriptions, Tag, Tooltip } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import RatingModal from "../components/modal/RatingModal";
import { showAverage } from "../functions/rating";
import ProductCard from "../components/cards/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { addToWishlist } from "../functions/userFunctions";
import { toast } from 'react-toastify';

const { Meta } = Card;

const ProductDetails = ({ match }) => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [star, setStar] = useState(0);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [tooltip, setTooltip] = useState("Click to add");

    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const {
        _id,
        title,
        description,
        images,
        shipping,
        color,
        brand,
        subcategories,
        category,
        price,
    } = product || {};

    const { slug } = match.params;

    const handleAddToCart = () => {
        // create empty cart array
        if (typeof window !== "undefined") {
            let cart = [];
            // if cart is in localstorage, get it
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }
            const existingProductIndex = cart.findIndex(
                (item) => item._id === product._id
            );
            if (existingProductIndex !== -1) {
                // if product exists, update count
                cart[existingProductIndex].count += 1;
            } else {
                // else, add new product to cart
                cart.push({
                    ...product,
                    count: 1,
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            // remove duplicates
            // save to local storage
            // let uniqueProducts = _.uniqWith(cart, _.isEqual);
            // localStorage.setItem("cart", JSON.stringify(uniqueProducts));

            // show hover tooltip
            setTooltip("Added to cart!");

            // add to redux state
            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            })

            // show cart items in side drawer
            dispatch({
                type: "SET_DRAWER_VISIBLE",
                payload: true,
            })
        }
    };

    useEffect(() => {
        loadProduct();
    }, [slug]);

    useEffect(() => {
        if (product.ratings && user) {
            let existingRatingObject = product.ratings.find(
                (element) => element.postedBy.toString() === user._id.toString()
            );
            existingRatingObject && setStar(existingRatingObject.star); // current user's star
        }
    }, [product, user]);

    const loadProduct = () => {
        setLoading(true);
        getProductBySlug(slug).then((res) => {
            setProduct(res.data);
            // load related products also
            getRelated(res.data._id).then((res) => setRelatedProducts(res.data));

            setLoading(false);
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const onStarClick = (newRating, name) => {
        setStar(newRating);
        console.table("newRating: ", newRating, name);
        console.table("star: ", star, name);
        rateProductFunction(name, newRating, user.token).then((res) => {
            console.log("rating clicked", res.data);
            // loadProduct(); // to show updated rating in real time
        });
    };


    const handleAddToWishlist = (e) => {
        e.preventDefault();
        addToWishlist(product._id, user?.token).then((res) => {
            console.log("added to wishlist", res.data);
            toast.success("Added to wishlist")
        })
    }

    return (
        <div className="container-fluid px-5">
            {/* {JSON.stringify(subcategories)} */}
            {/* Product image and details  START*/}
            <div className="row pt-4">
                <div className="col-md-6">
                    <Carousel showArrows={true} style={{ border: "1px solid lightgray" }}>
                        {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
                    </Carousel>

                    <Tabs
                        style={{
                            border: "1px solid rgb(240, 240, 240)",
                            padding: "8px",
                            minHeight: "200px",
                        }}
                    >
                        <Tabs.TabPane tab="Description" key="description">
                            {description}
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="More info" key="more-info">
                            For support contact ardit.hys@outlook.com
                        </Tabs.TabPane>
                    </Tabs>
                </div>
                <div className="col-md-6">
                    {/* <ul className="list-group list-group-flush">
                        <li className="list-group-item">Cras justo odio</li>
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Morbi leo risus</li>
                        <li className="list-group-item">Porta ac consectetur ac</li>
                        <li className="list-group-item">Vestibulum at eros</li>
                    </ul> */}
                    <Descriptions title={title} bordered>
                        <Descriptions.Item span={3} label="Category">
                            <Tag>
                                {/* <a href="#">{category.name}</a> */}
                                <Link to={`/category/${category.slug}`}>{category.name}</Link>
                            </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item span={3} label="Subcategories">
                            {subcategories.map((s) => (
                                <Tag key={s._id}>
                                    <Link to={`/subcategory/${s.slug}`}>{s.name}</Link>
                                </Tag>
                            ))}
                        </Descriptions.Item>
                        <Descriptions.Item span={3} label="Brand">
                            {brand}
                        </Descriptions.Item>
                        <Descriptions.Item span={3} label="Color">
                            {color}
                        </Descriptions.Item>
                        <Descriptions.Item span={3} label="Shipping">
                            {shipping}
                        </Descriptions.Item>
                        <Descriptions.Item span={3} label="Price">
                            <b>{price} €</b>
                        </Descriptions.Item>
                    </Descriptions>
                    {/* <div>rating</div> */}
                    <Card
                        actions={[
                            <Tooltip title={tooltip}>
                                <a onClick={handleAddToCart}>
                                    <ShoppingCartOutlined
                                        style={{ fontSize: "23px" }}
                                        type="button"
                                        key="cart"
                                    />
                                </a>
                                <br />
                                Add to Cart
                            </Tooltip>,
                            <a onClick={handleAddToWishlist}>
                                <HeartOutlined
                                    className="text-danger"
                                    style={{ fontSize: "23px" }}
                                    type="button"
                                    key="heart"
                                />
                                <br />
                                Add to Wishlist
                            </a>
                            ,
                            <RatingModal>
                                <StarRatings
                                    name={_id}
                                    starRatedColor="rgb(24, 144, 255)"
                                    starHoverColor="rgb(24, 144, 255)"
                                    numberOfStars={5}
                                    rating={star}
                                    changeRating={onStarClick}
                                    starDimension="22px"
                                    starSpacing="4px"
                                />
                            </RatingModal>,
                        ]}
                    >
                        <Skeleton loading={loading}>
                            <Meta
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                                description={
                                    <div className="custom-meta">
                                        {product && product.ratings && product.ratings.length > 0
                                            ? showAverage(product)
                                            : "No rating yet"}
                                    </div>
                                }
                            />
                        </Skeleton>
                    </Card>
                </div>
            </div>
            {/* Product image and details  END*/}
            <div className="row p-5">
                <div className="col text-center pt-5 pb-5">
                    <hr />
                    <h4>Related Products</h4>
                    {/* {JSON.stringify(relatedProducts)} */}
                    <hr />
                </div>
            </div>

            <div className="row pb-5">
                {relatedProducts.length > 0 ? (
                    relatedProducts.map((r) => (
                        <div className="col-md-3" key={r._id}>
                            <ProductCard product={r} />
                        </div>
                    ))
                ) : (
                    <div className="text-center col">No related products found.</div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;

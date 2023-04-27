import React, { useState } from "react";
import { Skeleton, Card, Tooltip } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import { useDispatch } from "react-redux";

const { Meta } = Card;

const ProductCard = ({ product, loading }) => {
    const { title, description, images, slug, price } = product;
    const [tooltip, setTooltip] = useState("Click to add");

    // const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

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

    return (
        <Card
            hoverable
            style={{
                width: 300,
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
                flexBasis: "calc(33.33% - 16px)", // 3 cards per row, with 16px of gutter space between them
            }}
            cover={
                <Link to={`/product/${slug}`}>
                    <img
                        src={
                            images && images.length
                                ? images[0].url
                                : "https://via.placeholder.com/300x200"
                        }
                        alt={title}
                        className="p-1"
                        style={{
                            // adjust the image size to fit within the fixed dimensions
                            objectFit: "contain",
                            width: "300px",
                            height: "300px",
                            borderBottom: "1px solid lightgray",
                        }}
                    />
                </Link>
            }
            actions={[
                <Link to={`/product/${slug}`}>
                    {/* <EyeOutlined key="eye" />, */}
                    View Product
                </Link>,
                <Tooltip title={tooltip}>
                    <a onClick={handleAddToCart}>
                        <ShoppingCartOutlined
                            style={{ fontSize: "23px" }}
                            type="button"
                            key="cart"
                        />
                    </a>
                </Tooltip>,
            ]}
        >
            <Skeleton loading={loading}>
                <Meta
                    title={title}
                    description={
                        <div>
                            {description &&
                                description.substring(0, 60) + "..."}
                            <br />
                            <br />
                            <b>{price} €</b>
                            <br />
                            {product &&
                            product.ratings &&
                            product.ratings.length > 0
                                ? showAverage(product)
                                : "No rating yet"}
                        </div>
                    }
                />
            </Skeleton>
        </Card>
    );
};

export default ProductCard;

import React from "react";
import { Skeleton, Card, Button, Popconfirm } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";

const { Meta } = Card;

const ProductCard = ({ product, loading }) => {
    const { title, description, images, slug, price } = product;

    const handleAddToCart = () => {
        // create empty cart array
        let cart = [];
        if (typeof window !== "undefined") {
            // if cart is in localstorage, get it
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }
            // else, push new product to cart
            cart.push({
                ...product,
                count: 1,
            });
            // remove duplicates
            let uniqueProducts = _.uniqWith(cart, _.isEqual);
            // save to local storage
            localStorage.setItem("cart", JSON.stringify(uniqueProducts));
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
                    <a onClick={handleAddToCart}>
                        <ShoppingCartOutlined
                            style={{ fontSize: "23px" }}
                            type="button"
                            key="cart"
                        />
                    </a>,
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

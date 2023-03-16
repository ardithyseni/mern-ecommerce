import React from "react";
import { Skeleton, Card, Button, Popconfirm } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { showAverage } from "../../functions/rating";
const { Meta } = Card;

const ProductCard = ({ product, loading }) => {
    const { title, description, images, slug } = product;
    return (
        <Link to={`/product/${slug}`}>
            <Card
                hoverable
                style={{
                    width: 300,
                    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
                    flexBasis: 'calc(33.33% - 16px)', // 3 cards per row, with 16px of gutter space between them
                }}
                cover={
                    <img
                        src={
                            images && images.length
                                ? images[0].url
                                : "https://via.placeholder.com/300x200"
                        }
                        className="p-1"
                        style={{ // adjust the image size to fit within the fixed dimensions
                            objectFit: 'contain',
                            width: '300px',
                            height: '300px',
                            borderBottom: '1px solid lightgray',
                        }}
                    />
                }
                actions={[
                    <Link to={`/product/${slug}`}>
                        {/* <EyeOutlined key="eye" />, */}
                        View Product
                    </Link>,
                    <Popconfirm
                        title="Delete this product?"
                        // onConfirm={() => handleRemoveProduct(slug)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No">
                        <ShoppingCartOutlined style={{ fontSize: '23px' }} type="button" key="cart" />,
                    </Popconfirm>,
                ]}
            >
                <Skeleton loading={loading}>
                    <Meta
                        title={title}
                        description={<div>
                            {description && description.substring(0, 60) + "..."}
                            <br />
                            <br />
                            {product && product.ratings &&
                                product.ratings.length > 0 ? showAverage(product) : "No rating yet"}
                        </div>
                        }
                    />
                </Skeleton>
            </Card>
        </Link>
    );
};

export default ProductCard;

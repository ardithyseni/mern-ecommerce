import React from "react";
import { Modal, Card, Button, Popconfirm } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
const { Meta } = Card;

const ProductCard = ({product}) => {
    const { title, description, images, slug } = product;
    return (
        <Link to={`/product/${slug}`}>
            <Card
                hoverable
                style={{
                    width: 300,
                    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
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
                    <Link to={`/admin/product/${slug}`}>
                        {/* <EyeOutlined key="eye" />, */}
                        View Product
                    </Link>,
                    <Popconfirm
                        title="Delete this product?"
                        // onConfirm={() => handleRemoveProduct(slug)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No">
                        <ShoppingCartOutlined style={{ fontSize: '23px' }}  type="button" key="cart" />,
                    </Popconfirm>,
                ]}
            >
                <Meta
                    title={title}
                    description={`${description && description.substring(0, 50)}...`}
                />
            </Card>
        </Link>
    );
};

export default ProductCard;

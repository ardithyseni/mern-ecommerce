import React, { useEffect, useState } from "react";
import { getProductBySlug } from "../functions/product";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Card, Skeleton, Tabs, Descriptions, Tag } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import StarRatings from 'react-star-ratings';
import { Link } from "react-router-dom";
import RatingModal from "../components/modal/RatingModal";


const { Meta } = Card;

const ProductDetails = ({ match }) => {
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        loadProduct();
    }, [slug]);

    const loadProduct = () => {
        setLoading(true);
        getProductBySlug(slug).then((res) => {
            setProduct(res.data);
            setLoading(false);
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-fluid px-5">
            {/* {JSON.stringify(subcategories)} */}
            {/* Product image and details  START*/}
            <div className="row pt-4">
                <div className="col-md-6">
                    <Carousel
                        showArrows={true}
                        style={{ border: "1px solid lightgray" }}
                    >
                        {images &&
                            images.map((i) => (
                                <img src={i.url} key={i.public_id} />
                            ))}
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
                        <Descriptions.Item span={3} label="Order time">
                            2018-04-24 18:00:00
                        </Descriptions.Item>

                        <Descriptions.Item span={3} label="Category">
                            <Tag>
                                <a href="#">{category.name}</a>
                            </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item span={3} label="Subcategories">
                            {subcategories.map((s) => (
                                <Tag key={s._id}>
                                    <a href="#">{s.name}</a>
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
                    <div>rating</div>
                    <Card
                        actions={[
                            <>
                                <ShoppingCartOutlined
                                    className="text-success"
                                    style={{ fontSize: "23px" }}
                                    type="button"
                                    key="cart"
                                />
                                <br />
                                Add to Cart
                            </>,
                            <Link to="/">
                                <HeartOutlined
                                    className="text-danger"
                                    style={{ fontSize: "23px" }}
                                    type="button"
                                    key="heart"
                                />
                                <br />
                                Add to Wishlist
                            </Link>,
                            <RatingModal>
                                <StarRatings
                                    name={_id}
                                    starRatedColor="rgb(24, 144, 255)"
                                    starHoverColor="rgb(24, 144, 255)"
                                    changeRating={(newRating, name) => console.log('new Rating', newRating, "name ", name)}
                                    starDimension="22px"
                                    starSpacing="4px"
                                />
                            </RatingModal>
                        ]}
                    >
                        <Skeleton loading={loading}>
                            <Meta
                                style={{ display: "flex", justifyContent: "center" }}
                                description={
                                    <div className="custom-meta">

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
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

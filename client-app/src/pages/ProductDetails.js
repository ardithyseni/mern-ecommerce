import React, { useEffect, useState } from 'react';
import { getProductBySlug } from '../functions/product';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Card, Skeleton, Badge, Descriptions, Tag } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Meta } = Card;


const ProductDetails = ({ match }) => {
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);

    const { title, description, images, shipping, color, brand, subcategories, category, price } = product || {};

    const { slug } = match.params;

    useEffect(() => {
        loadProduct();
    }, [slug])

    const loadProduct = () => {
        setLoading(true);
        getProductBySlug(slug).then((res) => {
            setProduct(res.data);
            setLoading(false);
        })
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className='container-fluid px-5'>
            {JSON.stringify(subcategories)}
            {/* Product image and details  START*/}
            <div className='row pt-4'>
                <div className='col-md-6'>
                    <Carousel showArrows={true} style={{ border: '1px solid lightgray' }}>
                        {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
                    </Carousel>
                </div>
                <div className='col-md-6'>

                    {/* <ul className="list-group list-group-flush">
                        <li className="list-group-item">Cras justo odio</li>
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Morbi leo risus</li>
                        <li className="list-group-item">Porta ac consectetur ac</li>
                        <li className="list-group-item">Vestibulum at eros</li>
                    </ul> */}
                    <Descriptions title={title} bordered>

                        <Descriptions.Item span={3} label="Order time">2018-04-24 18:00:00</Descriptions.Item>
                        <Descriptions.Item span={3} label="Shipping">{shipping}</Descriptions.Item>
                        <Descriptions.Item span={3} label="Category">{category.name}</Descriptions.Item>
                        <Descriptions.Item span={3} label="Subcategories">{subcategories.map((s) => (
                            <Tag key={s._id}>
      <a href="#">{s.name}</a>
    </Tag>
                        ))}</Descriptions.Item>
                        <Descriptions.Item span={3} label="Order time">2018-04-24 18:00:00</Descriptions.Item>
                        {/* <Descriptions.Item label="Usage Time" span={2}>
                            2019-04-24 18:00:00
                        </Descriptions.Item>
                        <Descriptions.Item label="Status" span={3}>
                            <Badge status="processing" text="Running" />
                        </Descriptions.Item>
                        <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
                        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                        <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
                        <Descriptions.Item label="Config Info"> */}
                        {/* Data disk type: MongoDB
                            <br />
                            Database version: 3.4
                            <br />
                            Package: dds.mongo.mid
                            <br />
                            Storage space: 10 GB
                            <br />
                            Replication factor: 3
                            <br />
                            Region: East China 1<br /> */}
                        {/* </Descriptions.Item> */}
                    </Descriptions>
                    <Card
                        actions={[
                            <>
                                <ShoppingCartOutlined style={{ fontSize: '23px' }} type="button" key="cart" />
                                <br />
                                Add to Cart
                            </>,
                            <Link to="/">
                                <HeartOutlined className='text-danger' style={{ fontSize: '23px' }} type="button" key="heart" />
                                <br />
                                Add to Wishlist
                            </Link>
                        ]}>
                        <Skeleton loading={loading}>

                            {/* <Meta
                            // title={title}
                            // description={description}

                            /> */}
                        </Skeleton>
                    </Card>
                </div>
            </div>
            {/* Product image and details  END*/}
            <div className='row'>
                <div>Related products</div>
            </div>
        </div>
    );
}

export default ProductDetails;

import React, { useEffect, useState } from 'react';
import { getProductBySlug } from '../functions/product';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Card, Skeleton } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Meta } = Card;


const ProductDetails = ({ match }) => {
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);

    const { title, description, images } = product || {};

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
        <div className='container-fluid'>
            {/* Product image and details  START*/}
            <div className='row pt-4'>
                <div className='col-md-7'>
                    {/* image carousel */}
                </div>
                <div className='col-md-5'>
                    <Card
                        actions={[
                            <>
                                <ShoppingCartOutlined style={{ fontSize: '23px' }} type="button" key="cart" />
                                <br />
                                Add to Cart
                            </>,
                            <Link to="/">
                                <HeartOutlined className='text-danger' style={{ fontSize: '23px' }} type="button" key="heart"/>
                                <br /> 
                                Add to Wishlist
                            </Link>
                        ]}>
                        <Skeleton loading={loading}>

                            <Meta
                                title={title}
                                description={description}
                            />
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

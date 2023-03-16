import React, { useEffect, useState } from 'react'
import { getSubcategory } from '../../functions/subcategory'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'
import ProductCard from '../../components/cards/ProductCard'



const SubCategoryHome = ({ match }) => {

    const [subcategory, setSubcategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug } = match.params;

    useEffect(() => {
        setLoading(true);
        getSubcategory(slug)
            .then((res) => {
                console.log(res.data);
                setSubcategory(res.data.subcategory);
                setProducts(res.data.products);
                setLoading(false);
            });
        // setLoading(false);
    }, [])

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col'>
                    {loading ? (
                        <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
                            <Spin size='large' />
                        </h4>
                    ) : (
                        <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
                        {products.length === 1 ? '1 product' : `${products.length} products`} in  <strong>{subcategory.name}</strong>  sub-category
                        </h4>
                    )}
                </div>
            </div>

            <div className='row'>
                {products.map((p) =>
                    <div className='col-md-3' key={p._id}>
                    <ProductCard product={p} loading={loading} />
                    </div>)}
            </div>
        </div>
    )
}

export default SubCategoryHome
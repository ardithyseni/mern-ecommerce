import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategories } from '../../functions/category'
import { Spin } from 'antd'

const CategoryList = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCategories().then(c => {
            setCategories(c.data)
            setLoading(false);
        })
    }, []);

    const showCategories = () =>
        categories.map((c) => (
            <Link key={c._id} to={`/category/${c.slug}`} className="col btn btn-outlined btn-light btn-lg btn-raised m-3">
                <div>
                    {c.name}
                </div>
            </Link>
        ))


    return (
        <div className='container'>
            <div className='row'>
                {loading ? (
                    <div className='text-center'>
                        <Spin size='large' />
                    </div>) :
                    showCategories()}
            </div>
        </div>
    )
}

export default CategoryList
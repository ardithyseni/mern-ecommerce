import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSubcategories } from '../../functions/subcategory'

import { Spin } from 'antd'

const SubCategoryList = () => {

    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getSubcategories().then(res => {
            setSubcategories(res.data)
            setLoading(false);
        })
    }, []);

    const showSubcategories = () =>
        subcategories.map((s) => (
            <Link key={s._id} to={`/subcategory/${s.slug}`} className="col btn btn-outlined btn-light btn-lg btn-raised m-3">
                <div>
                    {s.name}
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
                    showSubcategories()}
            </div>
        </div>
    )
}

export default SubCategoryList
import React, { useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import {
    createCategory,
    getCategories,
    removeCategory
} from '../../../functions/category'
import { Button, Checkbox, Form, Input } from 'antd';
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons'
import create from '@ant-design/icons/lib/components/IconFont'


const CategoryCreate = () => {

    const { user } = useSelector(state => ({ ...state }))

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createCategory({ name }, user.token)
            .then(res => {

                console.log(res)
                setLoading(false)
                setName('')
                toast.success(`Category: ${res.data.name} created!`)

            }).catch(err => {

                console.log(err);
                setLoading(false)
                toast.error(err.response.data)
                
            })
    }

    const errorSubmit = (e) => {
        e.preventDefault();
        toast.error("Create category failed")
    }

    const categoryForm = () => (

        <form onSubmit={handleSubmit}>

            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                    required
                />
            </div>

            <br />
            <Button
                onClick={handleSubmit}
                type="primary"
                block
                size="large"
                shape="round"
                icon={loading ? <LoadingOutlined /> : <CheckOutlined />}
                className="mb-2"
            // disabled={!email || password.length < 6}
            >
                Save
            </Button>
        </form>
    )

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    <h4>Create category</h4>
                    {categoryForm()}
                </div>
            </div>
        </div>

    )
}

export default CategoryCreate
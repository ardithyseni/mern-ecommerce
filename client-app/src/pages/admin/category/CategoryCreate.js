import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
    createCategory,
    getCategories,
    removeCategory
} from '../../../functions/category'
import { Button, Space, Table, Tag } from 'antd';
import { CheckOutlined, DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'


const CategoryCreate = () => {

    const { user } = useSelector(state => ({ ...state }))

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [columns, setColumns] = useState([
        {
            title: "Name",
            dataIndex: "name",
            key: 'name',
            width: "80%"
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, c) => (
                <Space size="middle">
                    <Link to={`/admin/category/${c.slug}`}>
                        <EditOutlined style={{ fontSize: '20px' }} />
                    </Link>
                    <span onClick={() => handleRemoveCategory(c.slug)} className='btn btn-sm'>
                        <DeleteOutlined style={{ fontSize: '20px' }} className='text-danger' />
                    </span>
                </Space>
            ),
        }
    ]);
    const [tabledata, setTabledata] = useState([]);
    const [action, setAction] = useState([
        {

        }
    ])

    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories = () => getCategories().then((c) => {
        setCategories(c.data)
        console.log(c.data);
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createCategory({ name }, user.token)
            .then(res => {
                // console.log(res)
                setLoading(false)
                setName('')
                toast.success(`Category: ${res.data.name} created!`)
                loadCategories();
            }).catch(err => {

                console.log(err);
                setLoading(false)
                toast.error(err.response.data)

            })
    }

    const handleRemoveCategory = async (slug) => {
        if (window.confirm("Delete Category?")) {
            setLoading(true);
            removeCategory(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    console.log("REMOVE CATEGORY THEN", res.data.deletedCategory.name)
                    toast.error(`${res.data.deletedCategory.name} category deleted`);
                    loadCategories();
                })
                .catch(err => {
                    if (err.response.status === 400) {
                        setLoading(false);
                        toast.error(err.response.data);
                    }
                })
        }
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
                disabled={name.length < 2}
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
                <div className="container p-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <h4>Create category</h4>
                            {categoryForm()}
                        </div>
                    </div>
                    <hr />
                    <table className='table table-hover w-auto mt-1'>
                        <thead className="thead-light">
                            <tr>
                                <th scope='col'>Name</th>
                                <th scope='col'><span className='float-right'>Action</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((c) => (
                                <tr key={c._id}>
                                    <td>{c.name}</td>


                                    <td>

                                        <span key="delete"
                                            onClick={() => handleRemoveCategory(c.slug)}
                                            className="btn btn-sm float-right"
                                        >
                                            <DeleteOutlined style={{ fontSize: '20px' }} className="text-danger" />
                                        </span>
                                        <Link to={`/admin/category/${c.slug}`}>
                                            <span key="edit" className="btn btn-sm float-right">
                                                <EditOutlined style={{ fontSize: '20px' }} />
                                            </span>
                                        </Link></td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* <Table columns={columns} dataSource={categories} /> */}
                </div>
            </div>
        </div>

    )
}

export default CategoryCreate
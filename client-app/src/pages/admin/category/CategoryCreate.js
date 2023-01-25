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


// const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//       render: (text) => <a>{text}</a>,
//     },
//     {
//       title: 'Age',
//       dataIndex: 'age',
//       key: 'age',
//     },
//     {
//       title: 'Address',
//       dataIndex: 'address',
//       key: 'address',
//     },
//     {
//       title: 'Tags',
//       key: 'tags',
//       dataIndex: 'tags',
//       render: (_, { tags }) => (
//         <>
//           {tags.map((tag) => {
//             let color = tag.length > 5 ? 'geekblue' : 'green';
//             if (tag === 'loser') {
//               color = 'volcano';
//             }
//             return (
//               <Tag color={color} key={tag}>
//                 {tag.toUpperCase()}
//               </Tag>
//             );
//           })}
//         </>
//       ),
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_, record) => (
//         <Space size="middle">
//           <a>Invite {record.name}</a>
//           <a>Delete</a>
//         </Space>
//       ),
//     },
//   ];
//   const data = [
//     {
//       key: '1',
//       name: {c.name},
//       age: 32,
//       address: 'New York No. 1 Lake Park',
//       tags: ['nice', 'developer'],
//     },
//     {
//       key: '2',
//       name: 'Jim Green',
//       age: 42,
//       address: 'London No. 1 Lake Park',
//       tags: ['loser'],
//     },
//     {
//       key: '3',
//       name: 'Joe Black',
//       age: 32,
//       address: 'Sidney No. 1 Lake Park',
//       tags: ['cool', 'teacher'],
//     },
//   ];



const CategoryCreate = () => {

    const { user } = useSelector(state => ({ ...state }))

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [columns, setColumns] = useState([
        {
            title: "Name",
            dataIndex: "name",
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

    const loadCategories = () => getCategories().then((c) => setCategories(c.data));

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
        if(window.confirm("Delete Category?")) {
            setLoading(true);
            removeCategory(slug, user.token)
            .then((res) => {
                setLoading(false);
                toast.error(`${res.data.name} category deleted`);
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
                    {categories.map((c) => (
                        <div className="alert alert-secondary" key={c._id}>
                            {c.name}
                            <span
                                // onClick={() => handleRemove(c.slug)}
                                className="btn btn-sm float-right"
                            >
                                <DeleteOutlined style={{ fontSize: '20px' }} className="text-danger" />
                            </span>
                            <Link to={`/admin/category/${c.slug}`}>
                                <span className="btn btn-sm float-right">
                                    <EditOutlined style={{ fontSize: '20px' }} />
                                </span>
                            </Link>
                        </div>
                    ))}
                    <Table columns={columns} dataSource={categories} />
                </div>
            </div>
        </div>

    )
}

export default CategoryCreate
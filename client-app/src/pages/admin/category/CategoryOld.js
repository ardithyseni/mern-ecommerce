import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
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
            dataIndex: "name"
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EditOutlined style={{ fontSize: '20px' }} />
                    <DeleteOutlined style={{ fontSize: '20px' }} className='text-danger' />
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
                        <div key={c._id}>{c.name}</div>
                    ))}
                    <Table columns={columns} dataSource={categories} />
                </div>
            </div>
        </div>

    )
}

export default CategoryCreate
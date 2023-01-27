import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
    createSubcategory,
    getSubcategories,
    removeSubcategory
} from '../../../functions/subcategory'
import { getCategories } from '../../../functions/category'
import { CheckOutlined, DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import CategoryForm from '../../../components/forms/CategoryForm'
import SearchInput from '../../../components/forms/SearchInput'

const CreateSubCategory = () => {

    const { user } = useSelector(state => ({ ...state }))

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [parentCategory, setParentCategory] = useState("");
    // search & filter step 1
    const [keyword, setKeyword] = useState("");


    useEffect(() => {
        loadSubcategories();
        loadCategories();
    }, [])

    const loadCategories = () => getCategories().then((c) => {
        setCategories(c.data)
        console.log(c.data);
    });
    
    const loadSubcategories = () => getSubcategories().then((s) => {
        setSubcategories(s.data)
        console.log(s.data);
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createSubcategory({ name, parent: parentCategory }, user.token)
            .then(res => {
                // console.log(res)
                setLoading(false)
                setName('')
                toast.success(`Subcategory: ${res.data.name} created!`)
                loadSubcategories();
            }).catch(err => {

                console.log(err);
                setLoading(false)
                toast.error(err.response.data)

            })
    }

    const handleRemoveCategory = async (slug) => {
        if (window.confirm("Delete Category?")) {
            setLoading(true);
            removeSubcategory(slug, user.token)
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


    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

    // const categoryForm = () => (

    //     <form onSubmit={handleSubmit}>

    //         <div className="form-group">
    //             <input
    //                 type="text"
    //                 className="form-control"
    //                 placeholder="Category Name"
    //                 value={name}
    //                 onChange={(e) => setName(e.target.value)}
    //                 autoFocus
    //                 required
    //             />
    //         </div>

    //         <br />
    //         <Button
    //             onClick={handleSubmit}
    //             type="primary"
    //             block
    //             size="large"
    //             shape="round"
    //             icon={loading ? <LoadingOutlined /> : <CheckOutlined />}
    //             className="mb-2"
    //             disabled={name.length < 2}
    //         >
    //             Save
    //         </Button>
    //     </form>
    // )

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="container p-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <h4>Create Subcategory</h4>

                            <div className='form-group'>
                                <label>Select Parent Category</label>
                                <select className="custom-select" onChange={(e) => setParentCategory(e.target.value)}>
                                    <option>Select</option>
                                    {categories.length > 0 && categories.map((c) => (
                                        <option key={c._id} value={c._id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                                        {JSON.stringify(parentCategory)}
                            {/* {categoryForm()} */}
                            <CategoryForm
                                handleSubmit={handleSubmit}
                                name={name}
                                setName={setName}
                                buttonName="Create"
                            />
                        </div>
                    </div>

                    <hr />

                    <SearchInput keyword={keyword} setKeyword={setKeyword} />

                    <table className='table table-hover w-auto mt-1'>
                        <thead className="thead-light">
                            <tr>
                                <th scope='col'>Name</th>
                                <th scope='col'><span className='float-right'>Action</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {subcategories.filter(searched(keyword)).map((s) => (
                                <tr key={s._id}>
                                    <td>{s.name}</td>


                                    <td>

                                        <span key="delete"
                                            onClick={() => handleRemoveCategory(s.slug)}
                                            className="btn btn-sm float-right"
                                        >
                                            <DeleteOutlined style={{ fontSize: '20px' }} className="text-danger" />
                                        </span>
                                        <Link to={`/admin/subcategory/${s.slug}`}>
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

export default CreateSubCategory
import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getCategories } from '../../../functions/category'
import CategoryForm from '../../../components/forms/CategoryForm'
import { getSubcategory, updateSubcategory } from '../../../functions/subcategory'


const UpdateSubcategory = ({ history, match }) => {

    const { user } = useSelector(state => ({ ...state }))

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [parent, setParent] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // console.log('match', match)
        loadCategories();
        loadSubcategory();

    }, [])

    const loadSubcategory = () => getSubcategory(match.params.slug).then((s) => {
        setName(s.data.name)
        setParent(s.data.parent);
    });

    const loadCategories = () => getCategories().then((c) => setCategories(c.data));


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!parent) {
            toast.error(`Please select a parent category`);
            return;
        }
        setLoading(true);
        updateSubcategory(match.params.slug, { name, parent }, user.token)
            .then((res) => {
                console.log('erdh te rreshti 31')
                setLoading(false);
                setName("");
                toast.success(`SubCategory updated`);
                history.push("/admin/subcategory");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="container p-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <h4>Update SubCategory</h4>
                            {/* {categoryForm()} */}
                            <div className='form-group'>
                                <label>Select Parent Category</label>
                                <select required className="custom-select" onChange={(e) => setParent(e.target.value)}>
                                    <option>Select</option>
                                    {categories.length > 0 && categories.map((c) => (
                                        <option key={c._id} value={c._id} selected={c._id === parent}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <CategoryForm
                                handleSubmit={handleSubmit}
                                name={name}
                                setName={setName}
                                buttonName="Update"
                            />
                        </div>
                    </div>
                    <hr />

                </div>
            </div>
        </div>

    )
}

export default UpdateSubcategory
import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { updateCategory, getCategory } from '../../../functions/category'
import CategoryForm from '../../../components/forms/CategoryForm'


const CategoryUpdate = ({ history, match }) => {

    const { user } = useSelector(state => ({ ...state }))

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        // console.log('match', match)
        loadCategory();
    }, [])

    const loadCategory = () => getCategory(match.params.slug).then((c) => setName(c.data.name));


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateCategory(match.params.slug, {name}, user.token)
            .then((res) => {
                console.log('erdh te rreshti 31')
                setLoading(false);
                setName("");
                toast.success(`Category name updated to ${res.data.name}`);
                history.push("/admin/category");
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
                            <h4>Update Category</h4>
                            {/* {categoryForm()} */}
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

export default CategoryUpdate
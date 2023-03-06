import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import FileUpload from "../../../components/forms/FileUpload";

const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    subcategories: [],
    quantity: "",
    images: [],
    shipping: "",
    color: "",
    brand: "",
};

const ProductCreate = ({ history }) => {
    const [values, setValues] = useState(initialState);
    const [subcategoryOptions, setSubcategoryOptions] = useState([]);
    const [showSubcategories, setShowSubcategories] = useState(false);
    const [loading, setLoading] = useState(false);

    // redux
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () =>
        getCategories().then((c) => {
            setValues({ ...values, categories: c.data });
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        const hasEmptyFields = Object.values(values).some((value) => !value);
        if (hasEmptyFields) {
            alert("Please fill in all fields");
            return;
        }
        createProduct(values, user.token)
            .then((res) => {
                console.log(res);
                toast.success(`${values.title} successfully created`);
                history.push("/admin/dashboard");
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.err);
            });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        console.log(e.target.name, "--", e.target.value);
    };

    const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log("clicked category", e.target.value);
        setValues({ ...values, subcategories: [], category: e.target.value });
        getCategorySubs(e.target.value).then((res) => {
            console.log("getcategorysubs", res);
            setSubcategoryOptions(res.data);
        });
        setShowSubcategories(true);
    };

    // const isFormValid = Object.values(values).every(val => val !== "");

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-7">
                    <h4>Create a product</h4>
                    <hr />
                    <div className="p-3">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                            loading={loading}
                        />
                    </div>
                    {JSON.stringify(values.images)}
                    <ProductCreateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        setValues={setValues}
                        values={values}
                        handleCategoryChange={handleCategoryChange}
                        subcategoryOptions={subcategoryOptions}
                        showSubcategories={showSubcategories}
                    />
                    <br />
                </div>
            </div>
        </div>
    );
};

export default ProductCreate;

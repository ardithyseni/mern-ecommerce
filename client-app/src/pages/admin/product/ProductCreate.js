import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import { getCategories } from "../../../functions/category";
import { Button } from "antd";
import { LoadingOutlined, CheckOutlined } from "@ant-design/icons";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";

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

    // redux
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories = () => getCategories().then((c) => {
        setValues({ ...values, categories: c.data });
    });

    const handleSubmit = (e) => {
        e.preventDefault();
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
                    <ProductCreateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        values={values}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductCreate;

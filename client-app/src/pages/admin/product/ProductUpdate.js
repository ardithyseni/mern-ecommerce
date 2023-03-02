import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProductBySlug } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { useParams } from "react-router-dom";


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

const ProductUpdate = (props) => {

    const [values, setValues] = useState(initialState);

    const { user } = useSelector((state) => ({ ...state }));

    let { slug } = useParams();

    useEffect(() => {
        loadProductBySlug();
    }, [])

    const loadProductBySlug = () => {
        getProductBySlug(slug)
        .then(p => {
            // console.log('single product by slug', p);
            setValues({...values, ...p.data });
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-7">
                    <h4>Update Product</h4>
                    {JSON.stringify(values)}
                    <hr />

                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;

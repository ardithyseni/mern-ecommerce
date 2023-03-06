import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProductBySlug } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { useParams } from "react-router-dom";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";


const initialState = {
    title: "",
    description: "",
    price: "",
    // categories: [],
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
    const [categories, setCategories] = useState([]);
    // const [subcategories, setSubcategories] = useState([]);
    const [subcategoryOptions, setSubcategoryOptions] = useState([]);

    const { user } = useSelector((state) => ({ ...state }));

    const { slug } = useParams();

    useEffect(() => {
        loadProductBySlug();
        loadCategories();
    }, [])

    const loadProductBySlug = () => {
        getProductBySlug(slug)
            .then(p => {
                // console.log('single product by slug', p);
                setValues({ ...values, ...p.data });
            })
    }

    const loadCategories = () =>
        getCategories().then((c) => {
            // setValues({ ...values, categories: c.data });
            setCategories(c.data);
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        //
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        // console.log(e.target.name, "--", e.target.value);
    };

    const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log("clicked category", e.target.value);
        setValues({ ...values, subcategories: [], category: e.target.value });
        getCategorySubs(e.target.value).then((res) => {
            console.log("getcategorysubs", res);
            setSubcategoryOptions(res.data);
        });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-7">
                    <h4>Update Product</h4>
                    {/* {JSON.stringify(values)} */}
                    <ProductUpdateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        values={values}
                        setValues={setValues}
                        categories={categories}
                        handleCategoryChange={handleCategoryChange}
                        // subcategories={subcategories}
                        subcategoryOptions={subcategoryOptions}


                    />
                    <hr />

                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;

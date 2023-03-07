import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProductBySlug, updateProduct } from "../../../functions/product";
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
    const [arrayOfSubs, setArrayOfSubs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(false);
    
    const { user } = useSelector((state) => ({ ...state }));

    const { slug } = useParams();

    const history = useHistory();

    useEffect(() => {
        loadProductBySlug();
        loadCategories();
    }, []);

    const loadProductBySlug = () => {
        getProductBySlug(slug).then((p) => {
            // console.log("single product", p);
            // 1 load single proudct
            setValues({ ...values, ...p.data });
            // 2 load single product category subs
            getCategorySubs(p.data.category._id).then((res) => {
                setSubcategoryOptions(res.data); // on first load, show default subs
            });
            // 3 prepare array of sub ids to show as default sub values in antd Select
            let arr = [];
            p.data.subcategories.map((s) => {
                arr.push(s._id);
            });
            console.log("ARR", arr);
            setArrayOfSubs((prev) => arr); // required for ant design select to work
            //   console.log("ARR of subs", arrayofSubs);
        });
    };

    const loadCategories = () =>
        getCategories().then((c) => {
            // setValues({ ...values, categories: c.data });
            setCategories(c.data);
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        values.subcategories = arrayOfSubs;
        values.category = selectedCategory ? selectedCategory : values.category;

        updateProduct(slug, values, user.token)
        .then((res) => {
            setLoading(false);
            toast.success(`"${res.data.title}" has been updated`);
            history.push("/admin/products");
        }).catch((err) => {
            console.log(err);
            setLoading(false);
            // toast.error(err.response.data.err);
        })
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        // console.log(e.target.name, "--", e.target.value);
    };

    const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log("CLICKED CATEGORY", e.target.value);
        setValues({ ...values, subcategories: [] });

        setSelectedCategory(e.target.value);

        getCategorySubs(e.target.value).then((res) => {
            console.log("SUB OPTIONS ON CATGORY CLICK", res);
            setSubcategoryOptions(res.data);
        });

        console.log("EXISTING CATEGORY values.category", values.category);

        // if user clicks back to the original category
        // show its sub categories in default
        if (values.category._id === e.target.value) {
            loadProductBySlug();
        }
        // clear old sub category ids
        setArrayOfSubs([]);
    };


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-7">
                    <h4>Update Product</h4>
                    <hr />
                    <div className="p-3">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                            loading={loading}
                        />
                    </div>
                    <ProductUpdateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        setValues={setValues}
                        values={values}
                        handleCategoryChange={handleCategoryChange}
                        categories={categories}
                        subcategoryOptions={subcategoryOptions}
                        arrayOfSubs={arrayOfSubs}
                        setArrayOfSubs={setArrayOfSubs}
                        selectedCategory={selectedCategory}

                    />
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;

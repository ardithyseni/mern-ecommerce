import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import { Button } from "antd";
import { LoadingOutlined, CheckOutlined } from "@ant-design/icons";

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


const ProductCreate = () => {
    const [values, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        //
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        console.log(e.target.name, "--", e.target.value);
    };

    // const isFormValid = Object.values(values).every(val => val !== "");

    
const isFormValid = (values) => {
  for (const key in values) {
    if (!values[key]) return false;
  }
  return true;
};

    function isObjectEmpty(obj) {
      for (const value of Object.values(obj)) {
        if (value !== '') {
          return false;
        }
      }
      return true;
    }
    

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-7">
                    <h4>Create a product</h4>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                required
                                value={values.title}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type="text"
                                name="description"
                                className="form-control"
                                required
                                value={values.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Price</label>
                            <input
                                type="number"
                                name="price"
                                className="form-control"
                                required
                                value={values.price}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Shipping</label>
                            <select
                                name="shipping"
                                className="custom-select"
                                required
                                onChange={handleChange}
                            >
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Quantity</label>
                            <input
                                type="number"
                                min="0.1"
                                max="5999"
                                name="quantity"
                                className="form-control"
                                required
                                value={values.quantity}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Color</label>
                            <input
                                type="text"
                                name="color"
                                className="form-control"
                                required
                                value={values.color}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Brand</label>
                            <input
                                type="text"
                                name="brand"
                                className="form-control"
                                required
                                value={values.brand}
                                onChange={handleChange}
                            />
                        </div>
                        {/* <Button
                            onClick={handleSubmit}
                            type="primary"
                            block
                            size="large"
                            shape="round"
                            // disabled={}
                            icon={
                                loading ? (
                                    <LoadingOutlined />
                                ) : (
                                    <CheckOutlined />
                                )
                            }
                            className="mb-2"
                        >
                            Create
                        </Button> */}
                        <button type="submit" className="btn btn-primary">Create Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductCreate;

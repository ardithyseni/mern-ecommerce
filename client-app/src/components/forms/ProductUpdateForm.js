import React from "react";
import { Select } from "antd";
const { Option } = Select;

const ProductUpdateForm = ({
    handleSubmit,
    handleChange,
    handleCategoryChange,
    values,
    setValues,
    categories,
    // subcategories,
    arrayOfSubs,
    setArrayOfSubs,
    subcategoryOptions,
    selectedCategory,
}) => {

    // destructure
    const {
        title,
        description,
        price,
        category,
        // subcategories,
        quantity,
        images,
        shipping,
        color,
        brand,
    } = values;

    console.log(arrayOfSubs);
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    required
                    value={title}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea
                    name="description"
                    className="form-control"
                    required
                    value={description}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Price</label>
                <input
                    type="number"
                    step="any"
                    name="price"
                    className="form-control"
                    required
                    value={price}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Shipping</label>
                <select
                    name="shipping"
                    className="custom-select"
                    value={shipping === 'Yes' ? 'Yes' : 'No'}
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
                    step="any"
                    name="quantity"
                    className="form-control"
                    required
                    value={quantity}
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
                    value={color}
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
                    value={brand}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Select Category</label>
                <select
                    className="custom-select"
                    name="category"
                    // required={true}
                    onChange={handleCategoryChange}
                    value={selectedCategory ? selectedCategory : category._id}
                >
                    {categories.length > 0 &&
                        categories.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            <div>
                <label>Sub Categories</label>
                <Select
                    mode="multiple"
                    allowClear
                    placeholder="Select"
                    value={arrayOfSubs}
                    style={{
                        width: "100%",
                    }}
                    onChange={(value) => setArrayOfSubs(value)}
                >
                    {subcategoryOptions.length &&
                        subcategoryOptions.map((s) => (
                            <Option key={s._id} value={s._id}>
                                {s.name}
                            </Option>
                        ))}
                </Select>
            </div>

            <br />
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
            <button type="submit" className="btn btn-primary">
                Update Product
            </button>
        </form>
    );
};

export default ProductUpdateForm;

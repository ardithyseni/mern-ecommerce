import React from 'react'

const ProductCreateForm = ({handleSubmit, handleChange, values}) => {
    return (
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
                <textarea
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
                    step="any"
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
                    step="any"
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
    )
}

export default ProductCreateForm
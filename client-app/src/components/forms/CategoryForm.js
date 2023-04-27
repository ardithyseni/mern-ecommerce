import React from "react";
import { Button } from "antd";
import { LoadingOutlined, CheckOutlined } from "@ant-design/icons";

const CategoryForm = ({ handleSubmit, name, buttonName,setName, loading }) => {
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                    required
                />
            </div>

            <br />
            <Button
                onClick={handleSubmit}
                type="primary"
                block
                size="large"
                shape="round"
                icon={loading ? <LoadingOutlined /> : <CheckOutlined />}
                className="mb-2"
                disabled={name?.length < 2}
            >
                {buttonName}
            </Button>
        </form>
    );
};

export default CategoryForm;

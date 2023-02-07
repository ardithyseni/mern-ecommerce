import React from "react";
import { Modal, Card, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { Meta } = Card;

const AdminProductCard = ({
    open,
    product,
    loading,
    handleRemoveProduct,
    handleCancelModal,
    showModal,
}) => {
    //destructuring the properties
    const { title, description, images, slug } = product;
    return (
        <>
            <Card
                style={{
                    width: 300,
                }}
                cover={
                    <img
                        src={
                            images && images.length
                                ? images[0].url
                                : "https://via.placeholder.com/300x200"
                        }
                        className="p-1"
                    />
                }
                actions={[
                    <EditOutlined key="edit" />,
                    <Popconfirm
                        title="Delete this product?"
                        onConfirm={handleRemoveProduct}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No">
                        <DeleteOutlined type="button" key="delete"/>,
                    </Popconfirm>,
                ]}
            >
                <Meta
                    // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={title}
                    description={`${description && description.substring(0, 50)
                        }...`}
                />
            </Card>

        </>
    );
};

export default AdminProductCard;
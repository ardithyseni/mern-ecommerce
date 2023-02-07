import React from 'react'
import { Avatar, Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Meta } = Card;

const AdminProductCard = ({ product, loading, handleRemoveProduct, handleCancelModal, showModal }) => {

    //destructuring the properties
    const { title, description, images, slug } = product
    return (
        <Card
            style={{
                width: 300,
            }}
            cover={
                <img
                    src={images && images.length ? images[0].url : 'https://via.placeholder.com/300x200'}
                    className="p-1"
                />
            }
            actions={[
                <EditOutlined key="edit" />,
                <DeleteOutlined key="delete" onClick={() => {
                    showModal()
                    handleRemoveProduct(slug)}} />,
            ]}
        >
            <Meta
                // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={title}
                description={`${description && description.substring(0, 45)}...`}
            />
        </Card>
    )
}

export default AdminProductCard;
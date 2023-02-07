import React from 'react'
import { Avatar, Card } from 'antd';
import { SettingOutlined, EllipsisOutlined, EditOutlined } from '@ant-design/icons';
const { Meta } = Card;

const AdminProductCard = ({ product }) => {

    //destructuring the properties
    const { title, description, images} = product
    return (
        <Card
            style={{
                width: 300,
            }}
            cover={
                <img
                    src={images && images.length ? images[0].url: 'https://via.placeholder.com/300x200'}
                    className="p-1"
                />
            }
            actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
            ]}
        >
            <Meta
                // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={title}
                // description="This is the description"
            />
        </Card>
    )
}

export default AdminProductCard;
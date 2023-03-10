import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";

const RatingModal = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div onClick={() => setIsModalOpen(true)}>
                <StarOutlined
                    className="text-primary"
                    style={{ fontSize: "23px" }}
                    type="button"
                />
                <br />
                {user ? "Rate this product" : "Login to rate this product"}
            </div>
            <Modal
                title="Leave your rating"
                centered
                visible={isModalOpen}
                onOk={() => {
                    setIsModalOpen(false);
                    toast.success("Thank you for your feedback");
                }}
                onCancel={() => setIsModalOpen(false)}
            >
                {children}
            </Modal>
        </>
    );
};

export default RatingModal;

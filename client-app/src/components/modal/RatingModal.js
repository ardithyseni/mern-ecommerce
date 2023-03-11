import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";

const RatingModal = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [isModalOpen, setIsModalOpen] = useState(false);

    const history = useHistory();
    const params = useParams();

    // console.log('params', params);

    // const handleModal = () => {
    //     if (user && user.token) {
    //         setIsModalOpen(true)
    //     } else {
    //         history.push({
    //             pathname: '/login',
    //             state: { from: `/product/${params.slug}` }
    //         });
    //     }
    // }
    
    // with local storage
    const handleModal = () => {
        if (user && user.token) {
          setIsModalOpen(true);
        } else {
          localStorage.setItem("productSlug", params.slug);
          history.push({
            pathname: "/login",
            state: { from: `/product/${params.slug}` },
          });
        }
      };

    return (
        <>
            <div onClick={handleModal}>
                <StarOutlined
                    className="text-primary"
                    style={{ fontSize: "23px" }}
                    type="button"
                />
                <br />
                {user ? "Rate this product" : "Log in to rate this product"}
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

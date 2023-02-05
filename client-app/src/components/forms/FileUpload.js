import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Badge, Image } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const FileUpload = ({ values, setValues, setLoading, loading }) => {
    const { user } = useSelector((state) => ({ ...state }));

    const fileUploadChange = (e) => {
        // console.log(e.target.files);
        // resize
        let files = e.target.files; // 3
        let allUploadedFiles = values.images;

        if (files) {
            setLoading(true);
            for (let i = 0; i < files.length; i++) {
                try {
                    Resizer.imageFileResizer(
                        files[i],
                        720,
                        720,
                        "JPEG",
                        100,
                        0,
                        (uri) => {
                            console.log(uri);
                            axios
                                .post(
                                    `${process.env.REACT_APP_API}/uploadimages`,
                                    { image: uri },
                                    {
                                        headers: {
                                            idtoken: user.token,
                                        },
                                    }
                                )
                                .then((res) => {
                                    console.log("IMAGE UPLOAD RES DATA", res);
                                    setLoading(false);
                                    allUploadedFiles.push(res.data);

                                    setValues({
                                        ...values,
                                        images: allUploadedFiles,
                                    });
                                })
                                .catch((err) => {
                                    setLoading(false);
                                    console.log("CLOUDINARY UPLOAD ERR", err);
                                });
                        },
                        "base64",
                        200,
                        200
                    );
                } catch (error) {
                    console.log("error catch", error);
                }
            }
        }
    };
    // send back to server to upload to cloudinary
    // set url to images[] in the parent component state - ProductCreate

    const handleRemoveImage = (imageid) => {
        setLoading(true);
        console.log("remove image invoked", imageid);
    };

    return (
        <>
            <div className="row">
                <div className="form-group">
                    <label>
                        {loading ? <LoadingOutlined style={{ fontSize: "20px" }} /> : "Choose images"}
                    </label>
                    <input
                        type="file"
                        multiple
                        accept="images/*"
                        className="form-control-file"
                        onChange={fileUploadChange}
                    />
                </div>
            </div>
            <div className="row">
                {values.images &&
                    values.images.map((image) => (
                        <Badge
                            count="X"
                            key={image.public_id}
                            onClick={() => handleRemoveImage(image.public_id)}
                            style={{cursor: 'pointer'}}
                        >
                            <Image width={150} src={image.url} />
                        </Badge>
                    ))}
                {/* <Badge count="X" style={{cursor: 'pointer'}}>
                    <Image
                        width={150}
                        src="https://res.cloudinary.com/dk5gqcziw/image/upload/v1675533986/1675533984614.jpg"
                    />
                </Badge> */}
            </div>
        </>
    );
};

export default FileUpload;

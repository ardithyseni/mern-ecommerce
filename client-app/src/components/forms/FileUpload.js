import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";

const FileUpload = () => {
    const { user } = useSelector((state) => ({ ...state }));

    const fileUploadChange = (e) => {
        let files = e.target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i], // file
                    1000, // maxWidth
                    1000, // maxHeight
                    "JPEG", // format
                    100, // quality
                    0, // rotation
                    (uri) => {console.log(uri)}, // callback function
                    "base64" // output type
                );
            }
        }
    };

    return (
        <div className="row">
            <div className="form-group">
                <label>Choose image files</label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="form-control-file"
                    onChange={fileUploadChange}
                />
            </div>
        </div>
    );
};

export default FileUpload;

import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv';
dotenv.config();
// config

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


console.log(cloudinary.config);

export const uploadImages = async (req, res) => {
    console.log("erdh te upload backend");
    try {
        let result = await cloudinary.uploader.upload(req.body.image, {
            resource_type: "auto", // any type jpeg, png
            public_id: `${Date.now()}`,
        });

        res.json({
            public_id: result.public_id,
            url: result.secure_url,
        });
    } catch (error) {
        console.error(error);
    }

};

export const removeImage = (req, res) => {
    let image_id = req.body.public_id;
    cloudinary.uploader
        .destroy(image_id, function (error, result) {
            console.log(result, error);
        })
        .then((res) => console.log(res))
        .catch((_err) =>
            console.log("Something went wrong, please try again later.")
        );
        res.send("ok");
};

import cloudinary from "cloudinary";

// config

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImages = async (req, res) => {
    let result = await cloudinary.v2.uploader.upload(req.body.image, {
        public_id: `${Date.now()}`,
        resource_type: "auto", // any type jpeg, png
    });
    res.json({
        public_id: result.public_id,
        url: result.secure_url,
    });
};

export const removeImage = (req, res) => {
    let image_id = req.body.public_id;
    cloudinary.v2.uploader
        .destroy(image_id)
        .then((res) => res.send("ok"))
        .catch((err) => console.log(err));
};

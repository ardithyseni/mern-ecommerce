import Product from "../models/product.js";

export const handleColor = async (req, res, color) => {
    const products = await Product.find({ color })
        .populate("category", "_id name")
        .populate("subcategories", "_id name")
        .populate({
            path: "ratings.postedBy",
            model: "User",
            options: { strictPopulate: false },
        })
        .exec();

    res.json(products);
};

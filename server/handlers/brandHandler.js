import Product from "../models/product.js";

export const handleBrand = async (req, res, brand) => {
    const products = await Product.find({ brand })
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

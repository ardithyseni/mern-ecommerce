import Product from "../models/product.js";

export const handleShipping = async (req, res, shipping) => {
    const products = await Product.find({ shipping })
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

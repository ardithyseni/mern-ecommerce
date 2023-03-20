import Product from "../models/product.js";

export const handleCategory = async (req, res, category) => {
    try {
        let products = await Product.find({ category })
            .populate("category", "_id name")
            .populate("subcategories", "_id name")
            .populate({
                path: "ratings.postedBy",
                model: "User",
                options: { strictPopulate: false },
            })
            .exec();

            res.json(products);
    } catch (error) {
        console.log("category handler error", error);
    }
};

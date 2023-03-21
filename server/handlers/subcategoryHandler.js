import Product from "../models/product.js";

export const handleSubcategory = async (req, res, subcategory) => {
    const products = await Product.find({ subcategories: subcategory })
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

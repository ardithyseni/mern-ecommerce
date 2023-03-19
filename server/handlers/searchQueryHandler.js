export const handleSearchQuery = async (req, res, query) => {
    const products = await Product.find({ $text: { $search: query } })
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
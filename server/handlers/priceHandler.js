export const handlePrice = async (req, res, price) => {
    try {
        let products = await Product.find({
            price: {
                // greater than or equal to the first index of price parameter
                $gte: price[0],
                // less than or equal to the second index of price parameter
                $lte: price[1],
            },
        })
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
        console.log('error handlePrice ', error);
    }
};

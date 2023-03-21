import Product from "../models/product.js";

export const handleRating = (req, res, stars) => {
    Product.aggregate([
        {
            $project: {
                document: "$$ROOT",
                floorAverage: {
                    $floor: { $avg: "$ratings.star" },
                },
            },
        },
        { $match: { floorAverage: stars } },
    ])
        .limit(12)
        .exec((error, aggregates) => {
            if (error) console.log("handleRating Error", error);
            Product.find({ _id: aggregates })
                .populate("category", "_id name")
                .populate("subcategories", "_id name")
                .populate({
                    path: "ratings.postedBy",
                    model: "User",
                    options: { strictPopulate: false },
                })
                .exec((error, products) => {
                    if (error) console.log("Product aggregate error", error);
                    res.json(products);
                });
        });
};

/*
The handleRating method is responsible for filtering products based on their average rating. 
It takes in three parameters - req, res, and stars. req and res are the 
request and response objects respectively, while stars is the rating to filter by.

The method uses the Product model to perform an aggregation query that 
calculates the average rating for each product and rounds it down to the 
nearest integer using the $floor operator. It then matches the products 
whose average rating equals the provided stars parameter.

In the $project stage of the Product aggregation query, 
the document: "$$ROOT" syntax is used to create a new field 
called document that contains the entire document of the current 
product being processed in the pipeline.

The $$ROOT variable is a system variable in MongoDB that refers 
to the root document currently being processed. In this case, the 
$project stage creates a new field called document that contains 
the root document of the current product being processed.

By including the entire document in this new field, the 
subsequent pipeline stages can access any field in the original 
Product document, including the ratings field, which is used to 
calculate the average rating in the pipeline. This can be useful in 
situations where you need to preserve the original document and its 
fields while performing additional operations in the pipeline.
*/
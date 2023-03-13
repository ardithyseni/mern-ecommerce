import Product from "../models/product.js";
import slugify from "slugify";
import User from "../models/user.js";

export const createProduct = async (req, res) => {
    try {
        console.log(req.body);
        req.body.slug = slugify(req.body.title);
        const newProduct = await new Product(req.body).save();
        res.json(newProduct);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            err: err.message,
        });
    }
};

export const listProducts = async (req, res) => {
    let products = await Product.find({});
    // .limit(parseInt(req.params.count))
    // .populate('category')
    // .populate('subcategories')
    // .sort([['createdAt', 'desc']])
    // .exec();
    res.json(products);
};

export const listProductsByCount = async (req, res) => {
    let products = await Product.find({})
        .limit(parseInt(req.params.count))
        .populate("category")
        .populate("subcategories")
        .sort([["createdAt", "desc"]])
        .exec();
    res.json(products);
};

export const removeProduct = async (req, res) => {
    // console.log(req);
    try {
        const product = await Product.findOne({
            slug: req.params.slug,
        }).exec();

        if (!product) {
            return res.status(404).send("Product not found");
        }

        const deletedProduct = await product.remove();
        res.json(deletedProduct);
    } catch (err) {
        console.log(err);
        return res.status(400).send("Product remove controller failed");
    }
};

export const getProductBySlug = async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug })
        .populate("category")
        .populate("subcategories")
        .exec();

    res.json(product);
};

export const updateProduct = async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updatedProduct = await Product.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }
        ).exec();

        res.json(updatedProduct);
    } catch (error) {
        console.log("update product error", error);
        res.status(400).json({
            error: error.message,
        });
    }
};

// without pagination

// export const listProductsByFilter = async (req, res) => {
//     try {
//         // createdAt | updatedAt,  desc | asc,  3
//         const { sort, order, limit } = req.body;
//         const productsToFilter = await Product.find({})
//             .populate("category")
//             .populate("subcategories")
//             .sort([[sort, order]])
//             .limit(limit)
//             .exec();

//         res.json(productsToFilter);

//     } catch (error) {
//         console.log(error);
//     }
// };

// with pagination
export const listProductsByFilter = async (req, res) => {
    console.table(req.body);
    try {
        // createdAt | updatedAt,  desc | asc,  3
        const { sort, order, pageNumber } = req.body;
        const currentPage = pageNumber || 1;
        const perPage = 3;

        const productsToFilter = await Product.find({})
            .skip((currentPage - 1) * perPage)
            .populate("category")
            .populate("subcategories")
            .sort([[sort, order]])
            .limit(perPage)
            .exec();

        res.json(productsToFilter);
    } catch (error) {
        console.log(error);
    }
};

export const countProducts = async (req, res) => {
    let total = await Product.find({}).estimatedDocumentCount().exec();

    res.json(total);
};

export const rateProduct = async (req, res) => {
    const product = await Product.findById(req.params.productId).exec();
    const user = await User.findOne({ email: req.user.email }).exec();
    const { star } = req.body;
    console.log("|||||||||||||||||||");
    console.log(star);
    console.log("|||||||||||||||||||");
    // who is updating ?
    // check if currently logged in user has already added a rating to this product

    let existingRatingObject = product.ratings.find(
        (element) => element.postedBy.toString() === user._id.toString()
    );

    // if user has not left a rating, push it to the ratings array
    if (existingRatingObject === undefined) {
        let ratingAdded = await Product.findByIdAndUpdate(
            product._id,
            {
                $push: { ratings: { star, postedBy: user._id } },
            },
            { new: true }
        ).exec();
        console.log(
            "ratingAdded",
            ratingAdded,
            "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"
        );
        res.json(ratingAdded);
    } else {
        // if user has already left rating, update it
        const ratingUpdated = await Product.updateOne(
            {
                ratings: { $elemMatch: existingRatingObject },
            },
            { $set: { "ratings.$.star": star } },
            { new: true }
        ).exec();
        console.log("ratingUpdated", ratingUpdated);
        res.json(ratingUpdated);
    }
};

export const getRelatedProducts = async (req, res) => {
    const product = await Product.findById(req.params.productId).exec();

    const related = await Product.find({
        _id: { $ne: product._id },
        category: product.category,
    })
    .limit(3)
    .populate("category")
    .populate("subcategories")
    .populate("postedBy")
    .exec();

    res.json(related);
};

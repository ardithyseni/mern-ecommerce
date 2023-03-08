import Product from "../models/product.js";
import slugify from "slugify";

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
    let total = await Product.find({})
        .estimatedDocumentCount()
        .exec();

    res.json(total);
};
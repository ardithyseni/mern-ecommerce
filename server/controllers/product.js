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

export const getBySlug = async (req, res) => {
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

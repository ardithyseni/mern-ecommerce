import Product from "../models/product.js";
import slugify from "slugify";

export const createProduct = async (req, res) => {
    try {

        console.log(req.body);
        req.body.slug = slugify(req.body.title);
        const newProduct = await new Product(req.body).save();
        res.json(newProduct);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            err: err.message,
        })
    }
}

export const listProducts = async (req, res) => {
    let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate('category')
    .populate('subcategories')
    .sort([['createdAt', 'desc']])
    .exec();
    res.json(products);
}
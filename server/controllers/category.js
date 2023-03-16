import Category from "../models/category.js";
import Product from "../models/product.js";
import Subcategory from "../models/subcategory.js";
import slugify from "slugify";

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await new Category({
            name: name,
            slug: slugify(name).toLowerCase(),
        }).save();

        res.json(category);
    } catch (error) {
        // console.log(error);
        res.status(400).send("Create category failed");
    }
};

export const listCategories = async (req, res) => {
    res.json(await Category.find({}).sort({ createdAt: -1 }).exec());
};

export const readCategory = async (req, res) => {
    let category = await Category.findOne({ slug: req.params.slug }).exec();
    // res.json(category);
    const products = await Product.find({category: category})
    .populate('category')
    .exec();

    res.json({
        category,
        products
    });
};

export const removeCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findOneAndDelete({
            slug: req.params.slug,
        });
        res.json({
            message: "You just deleted",
            deletedCategory,
        });
    } catch (error) {
        res.status(400).send("Delete category failed");
        res.json(error);
        console.log(error);
    }
};

export const updateCategory = async (req, res) => {
    const { name } = req.body;
    try {
        // https://www.mongodb.com/docs/manual/reference/method/db.collection.findOneAndUpdate/#examples
        const updatedCategory = await Category.findOneAndUpdate(
            {
                slug: req.params.slug,
            },
            {
                name: name,
                slug: slugify(name),
            },
            {
                new: true,
            }
        );
        res.json(updatedCategory);
    } catch (error) {
        res.status(400).send("Update category failed");
        console.log(error);
    }
};

export const getSubcategories = (req, res) => {
    Subcategory.find({ parent: req.params._id }).exec((err, subcategories) => {
        if (err) console.log(err)
        res.json(subcategories);
    });
};

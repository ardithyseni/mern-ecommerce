import Subcategory from '../models/subcategory.js';
import Product from '../models/product.js';
import slugify from 'slugify';

export const createSubcategory = async (req, res) => {
    try {
        const { name, parent } = req.body;
        const subcategory = await new Subcategory({
            name: name,
            parent: parent,
            slug: slugify(name).toLowerCase()
        }).save();

        res.json(subcategory);
    } catch (error) {
        // console.log(error);
        res.status(400).send('Create subcategory failed')
    }
}

export const listSubcategories = async (req, res) => {
    res.json(await Subcategory.find({}).populate('parent').sort({ createdAt: -1 }).exec());
}

export const readSubcategory = async (req, res) => {
    let subcategory = await Subcategory.findOne({ slug: req.params.slug }).exec();
    const products = await Product.find({ subcategories: subcategory })
        .populate('category')
        .exec();

    res.json({ subcategory, products });
}


export const removeSubcategory = async (req, res) => {
    try {
        const deletedSubcategory = await Subcategory.findOneAndDelete({ slug: req.params.slug });
        res.json({
            message: "You just deleted",
            deletedSubcategory
        })
    } catch (error) {
        res.status(400).send('Delete subcategory failed')
        res.json(error);
        console.log(error);
    }
}

export const updateSubcategory = async (req, res) => {
    try {
        const { name, parent } = req.body;
        // https://www.mongodb.com/docs/manual/reference/method/db.collection.findOneAndUpdate/#examples
        const updatedSubcategory = await Subcategory.findOneAndUpdate(
            {
                slug: req.params.slug
            },
            {
                name: name,
                parent: parent,
                slug: slugify(name)
            },
            {
                new: true
            });
        res.json(updatedSubcategory)
    } catch (error) {
        res.status(400).send('Update subcategory failed');
        console.log(error);
    }
}


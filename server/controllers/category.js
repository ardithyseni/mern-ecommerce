import Category from '../models/category.js';
import slugify from 'slugify';

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await new Category({
            name: name,
            slug: slugify(name).toLowerCase()
        }).save();

        res.json(category);
    } catch (error) {
        // console.log(error);
        res.status(400).send('Create category failed')
    }
}

export const listCategories = async (req, res) => {
    res.json(await Category.find({}).sort({ createdAt: -1 }).exec());
}

export const readCategory = async (req, res) => {
    let category = await Category.findOne({ slug: req.params.slug }).exec();
    res.json(category);
}


export const removeCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findOneAndDelete({ slug: req.params.slug });
        res.json({
            message: "You just deleted",
            deletedCategory
        })
    } catch (error) {
        res.status(400).send('Delete category failed')
        res.json(error);
        console.log(error);
    }
}

export const updateCategory = async (req, res) => {
    const { name } = req.body;
    try {
        // https://www.mongodb.com/docs/manual/reference/method/db.collection.findOneAndUpdate/#examples
        const updatedCategory = await Category.findOneAndUpdate(
            {
                slug: req.params.slug
            },
            {
                name: name, 
                slug: slugify(name)
            }, 
            {
                new: true 
            })
    } catch (error) {
        res.status(400).send('Update category failed');
        console.log(error);
    }
}

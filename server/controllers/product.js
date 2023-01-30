import Product from "../models/product.js";
import slugify from "slugify";

export const createProduct = async(req, res) => {
    try {
        
        console.log(req.body);
        req.body.slug = slugify(req.body.title);
        const newProduct = new Product(req.body).save()
        res.json(newProduct);

    } catch (error) {

        console.log(error)
        res.status(400).send("Create product failed")
    
    }
}
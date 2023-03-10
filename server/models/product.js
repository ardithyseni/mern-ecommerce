import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 64,
        text: true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 2500,
        text: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 32,
    },
    category: {
        type: ObjectId,
        ref: 'Category'
    },
    subcategories: [{
        type: ObjectId,
        ref: 'Subcategory',
    }],
    quantity: Number,
    sold: {
        type: Number,
        default: 0
    },
    images: {
        type: Array
    },
    shipping: {
        type: String,
        enum: ['Yes', 'No'],
    },
    color: {
        type: String,
        maxlength: 32,
    },
    brand: {
        type: String,
        maxlength: 32,
    },
    ratings: [
        {
            star: Number,
            postedBy: { type: ObjectId, ref: 'User' }
        }
    ]
},
    { timeStamps: true }
);

export default mongoose.model("Product", productSchema);
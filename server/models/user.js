import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        index: true,
    },
    role: {
        type: String,
        default: 'subscriber',
    },
    cart: {
        type: Array,
        default: [],
    },
    address: String,
    // wishlist: [{type: mongoose.Types.ObjectId, ref: "Product"}],
},
    { timestamps: true }
);

export default mongoose.model("User", userSchema);


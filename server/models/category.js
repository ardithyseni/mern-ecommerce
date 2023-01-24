import mongoose from "mongoose";
// OBJECTID

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: "Category name is required",
            minLength: [2, "Category name too short"],
            maxLength: [32, "Category name too long"],
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
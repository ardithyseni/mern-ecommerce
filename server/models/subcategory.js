import mongoose from "mongoose";
// OBJECTID
const { ObjectId } = mongoose.Schema;

const subcategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: "Subcategory name is required",
            minLength: [2, "Subcategory name too short"],
            maxLength: [32, "Subcategory name too long"],
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
        parent: { type: ObjectId, ref: "Category", required: true }
    },
    { timestamps: true }
);

export default mongoose.model("Subcategory", subcategorySchema);
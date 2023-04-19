import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const couponSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            uppercase: true,
            required: 'Coupon name is required',
            minlength: [4, "Name too short"],
            maxlength: [13, 'Name too long'],
        },
        expiryDate: {
            type: Date,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Coupon", couponSchema);
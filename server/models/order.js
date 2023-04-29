import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: ObjectId,
                    ref: 'Product',
                },
                count: Number,
                color: String,
            },
        ],
        paymentIntent: {},
        orderStatus: {
            type: String,
            default: 'Not Processed',
            enum: [
                'Not Processed',
                'Processing',
                'Dispatched',
                'Cancelled',
                'Completed',
            ]
        },
        orderedBy: { type: ObjectId, ref: 'User' }
    },
    { timestamps: true }
);

export default mongoose.model('Order', orderSchema);

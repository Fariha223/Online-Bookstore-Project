import mongoose from "mongoose";

const Orders = new mongoose.Schema(
    {
        products: [
            {
                type: mongoose.ObjectId,
                ref: "ProductModel",
            },
        ],
        payment: {
            type: String, 
            required: true
        },
        buyer: {
            type: mongoose.ObjectId,
            ref: "User",
        },
        status: {
            type: String,
            default: "Not Processed",
            enum: ["Not Processed", "Processing", "Shipped", "Deliverd", "Cancelled"],
        },
    },
    {timestamps: true}
);


export default mongoose.model('Orders', Orders);

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    city: { type: String,required: true},
    country: { type: String,required: true},
    address: { type: String,required: true},
    phone: { type: Number, required: true },
    delivered:{type: Boolean,default:false},
    createdAt: { type: Date, default: Date.now }
});

const OrderModel = mongoose.model("Order", orderSchema, "Order");

module.exports = { OrderModel };

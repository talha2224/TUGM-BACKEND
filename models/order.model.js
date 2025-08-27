const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    customer_address: { type: String,required: true},
    pickup_station: { type: String,required: true},
    delivered:{type: Boolean,default:false},
    status:{type: String,default:"ongoing",enum:["ongoing","delivered","cancelled"]},
    createdAt: { type: Date, default: Date.now }
});

const OrderModel = mongoose.model("Order", orderSchema, "Order");

module.exports = { OrderModel };

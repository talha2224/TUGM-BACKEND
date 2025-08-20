const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    listing_type: { type: String, required: true },
    shipping_type: { type: String, required: true },
    categories: { type: Array, default: [] },
    images: { type: Array, default: [] },
    size: { type: Array, default: [] },
    tags: { type: Array, default: [] },
    colors: { type: Array, default: [] },
    weight: { type: Number, required: true },
    dimensions: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const ProductModel = mongoose.model("Product", productSchema, "Product");

module.exports = { ProductModel };

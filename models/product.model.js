const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    title: { type: String, required: true },
    description: { type: String,required: true},
    price: { type: Number,required: true},
    stock: { type: Number,required: true},
    image: { type: String,required: true},
    createdAt: { type: Date, default: Date.now }
});

const ProductModel = mongoose.model("Product", productSchema, "Product");

module.exports = { ProductModel };

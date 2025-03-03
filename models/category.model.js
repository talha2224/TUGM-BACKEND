const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    category: { type: String, required: true },
});

const CategoryModel = mongoose.model("Category", categorySchema, "Category");

module.exports = { CategoryModel };

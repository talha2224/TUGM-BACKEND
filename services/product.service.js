const { ProductModel } = require("../models/product.model");
const { uploadFile } = require("../utils/function");

const createProduct = async (req, res) => {
    try {
        let { userId, title, description, price, stock,categoryId } = req.body
        let image = req.file
        let url = await uploadFile(image);
        const Product = new ProductModel({ image: url, userId, title, description, price, stock ,categoryId});
        await Product.save();
        return res.status(200).json({ data: Product, msg: null, status: 200 });
    }
    catch (error) {
        console.error("Error creating Post:", error);
        return { success: false, msg: "Failed to create Post" };
    }
};
const getAllProduct = async (req, res) => {
    try {
        const Product = await ProductModel.find({}).populate("categoryId");
        return res.status(200).json({ data: Product, msg: null, status: 200 });
    } catch (error) {
        console.error("Error fetching Post:", error);
        return { success: false, msg: "Failed to fetch Post" };
    }
};
const getAllProductSeller = async (req, res) => {
    try {
        const Product = await ProductModel.find({ userId: req?.params?.id }).populate("categoryId");
        return res.status(200).json({ data: Product, msg: null, status: 200 });
    } catch (error) {
        console.error("Error fetching Post:", error);
        return { success: false, msg: "Failed to fetch Post" };
    }
};
const updateProduct = async (req, res) => {
    try {
        let { title, description, price, stock } = req.body
        const Product = await ProductModel.findByIdAndUpdate(req.params?.id, { title, description, price, stock }, { new: true });
        return res.status(200).json({ data: Product, msg: null, status: 200 });
    }
    catch (error) {
        console.error("Error fetching Post:", error);
        return { success: false, msg: "Failed to fetch Post" };
    }
};
const deleteProduct = async (req, res) => {
    try {
        await ProductModel.findByIdAndDelete(req.params?.id);
        return res.status(200).json({ data: null, msg: "Product deleted successfully", status: 200 });
    }
    catch (error) {
        console.error("Error deleting Post:", error);
        return { success: false, msg: "Failed to delete Post" };
    }
};
const uploadPicture = async (req, res) => {
    try {
        let { id } = req.params;
        let image = req.file
        let url = await uploadFile(image);
        let updateProfile = await ProductModel.findByIdAndUpdate(id, { image: url }, { new: true })
        return res.status(200).json({ data: updateProfile, msg: "Product Picture Updated" })
    }
    catch (error) {
        console.log(error)
    }
}


module.exports = { getAllProduct, createProduct, deleteProduct, updateProduct, uploadPicture, getAllProductSeller };

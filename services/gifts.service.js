const { GiftsModel } = require("../models/gifts.model");
const { uploadFile } = require("../utils/function");


const createGift = async (req, res) => {
    try {
        let image = req.file
        let url = await uploadFile(image);
        let { title, coin } = req.body
        let data = await GiftsModel.create({ image: url, title, coin })
        return res.status(200).json({ data, msg: "Gift Added", status: 200 });

    }
    catch (error) {
        console.log(error)
    }
}

const getGift = async (req, res) => {
    try {
        let gift = await GiftsModel.find({})
        res.status(200).json({ data: gift })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error", status: 500 });
    }
};

const deleteGift = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedGift = await GiftsModel.findByIdAndDelete(id);
        if (!deletedGift) {
            return res.status(404).json({ message: 'Gift not found' });
        }
        res.status(200).json({ message: 'Gift deleted successfully' });
    } catch (error) {
        console.error('Error deleting gift:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createGift, getGift,deleteGift}
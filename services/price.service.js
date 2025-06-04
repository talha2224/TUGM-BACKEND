const { PriceModel } = require("../models/pricing.model");

const createUpdatePrice = async (req, res) => {
    try {
        let existing = await PriceModel.findOne();
        let data;

        if (existing) {
            existing.coinPrice = req.body.coinPrice;
            existing.subscriptionPrice = req.body.subscriptionPrice;
            await existing.save();
            data = existing;
        } else {
            data = await PriceModel.create(req.body);
        }

        return res.status(200).json({ data, msg: "Price saved", status: 200 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error", status: 500 });
    }
};

const getPrice = async (req, res) => {
    try {
        const price = await PriceModel.findOne();
        return res.status(200).json({ data: price, msg: "", status: 200 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error", status: 500 });
    }
};

module.exports = { createUpdatePrice, getPrice };

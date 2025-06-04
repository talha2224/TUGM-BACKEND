const { TransactionHistoryModel } = require("../models/transactionHistory.model");

const getAllHistory = async (req, res) => {
    try {
        let data = await TransactionHistoryModel.find({}).populate("userId")
        return res.status(200).json({ data: data, msg: "", status: 200 });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server Error", status: 500 });
    }
};



module.exports = { getAllHistory }

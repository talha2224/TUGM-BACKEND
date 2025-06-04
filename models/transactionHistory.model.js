const mongoose = require("mongoose")



const transactionHistorySchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    amount: { type: Number, default: 0 },
    type: { type: String, default: "Coin Purchase" },
    createdAt: { type: Date, default: Date.now }
})



const TransactionHistoryModel = mongoose.model("Transaction History", transactionHistorySchema, "Transaction History")


module.exports = { TransactionHistoryModel }

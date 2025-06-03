const mongoose = require("mongoose")



const priceSchema = mongoose.Schema({
    coinPrice: { type: Number, required: true },
    subscriptionPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
})



const PriceModel = mongoose.model("Price", priceSchema, "Price")


module.exports = { PriceModel }
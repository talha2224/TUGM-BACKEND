const mongoose = require("mongoose")



const giftSchema = mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    coin: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
})



const GiftsModel = mongoose.model("Gifts", giftSchema, "Gifts")


module.exports = { GiftsModel }
const mongoose = require("mongoose");

const biddingSchema = new mongoose.Schema({
    streamId: { type: mongoose.Schema.Types.ObjectId, ref: "LiveStream", required: true },
    userId:{type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true},
    amount:{type: String, required: true },
    winner:{type:Boolean,default:false},
    isPaid:{type:Boolean,default:false}
});

const BiddingModel = mongoose.model("Bidding", biddingSchema, "Bidding");

module.exports = { BiddingModel };

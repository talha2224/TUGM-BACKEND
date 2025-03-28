const mongoose = require("mongoose")



const giftSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"Account"},
    streamId: {type:mongoose.Schema.Types.ObjectId,ref:"LiveStream"},
    image:{type:String,required:true},
    viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }] ,
    createdAt: { type: Date, default: Date.now },
})



const GiftModel = mongoose.model("Gift",giftSchema,"Gift")


module.exports ={ GiftModel }
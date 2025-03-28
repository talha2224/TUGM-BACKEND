const { BiddingModel } = require("../models/bidding.model");


const getAllBidding = async (req,res) =>{
    try {
        let data = await BiddingModel.find({streamId:req?.params?.id}).populate("streamId").populate("userId")
        return res.status(200).json({data:data,msg:"",status:200})
    } 
    catch (error) {
        console.log(error)
    }
}

module.exports = {getAllBidding}
const { GiftModel } = require("../models/gift.model");


const createGift = async(req,res)=>{
    try {
        let data = await GiftModel.create(req?.body)
        return res.status(200).json({ data, msg: "Gift Send", status: 200 });

    } 
    catch (error) {
        console.log(error)
    }
}

const getGift = async (req, res) => {
    try {
        let { userId, streamId } = req.params;
        let gift = await GiftModel.findOne({streamId,viewers: { $ne: userId }}).populate("userId").sort({ createdAt: -1 });
        console.log(gift,'gift')

        if (!gift) {
            return res.status(200).json({ msg: "No available gifts", status: 404 });
        }
        gift.viewers.push(userId);
        await gift.save();
        return res.status(200).json({ data: gift, msg: "Gift retrieved", status: 200 });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error", status: 500 });
    }
};
const getGiftHost = async (req, res) => {
    try {
        let { userId, streamId } = req.params;
        console.log(userId, streamId )
        let gift = await GiftModel.findOne({streamId,viewers: { $ne: userId }}).populate("userId").sort({ createdAt: -1 });
        console.log(gift,'gift')

        if (!gift) {
            return res.status(200).json({ msg: "No available gifts", status: 404 });
        }
        gift.viewers.push(userId);
        await gift.save();
        return res.status(200).json({ data: gift, msg: "Gift retrieved", status: 200 });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error", status: 500 });
    }
};

module.exports ={createGift,getGift,getGiftHost}
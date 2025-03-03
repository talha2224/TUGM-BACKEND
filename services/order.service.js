const { OrderModel } = require("../models/order.model");


const createOrder = async (req, res) => {
    try {
        let { userId, product,city,country,address,phone} = req.body
        for (let index = 0; index <=product.length-1; index++) {
            const element = product[index];
            const Order = new OrderModel({userId,productId:element?._id,sellerId:element?.userId,city,country,address,phone,quantity:element?.quantity,total:element?.quantity*element?.price});
            await Order.save();
        }
        return res.status(200).json({ data: [], msg: "Order done",status: 200 });
    }
    catch (error) {
        console.error("Error creating Post:", error);
        return { success: false, msg: "Failed to create Post" };
    }
};

const getOrderForSeller = async (req, res) => {
    try {
        const Order = await OrderModel.find({ sellerId: req?.params?.id }).populate("userId").populate("productId");
        return res.status(200).json({ data:Order, msg: "",status: 200 });
    }
    catch (error) {
        console.error("Error creating Post:", error);
        return { success: false, msg: "Failed to create Post" };
    }
};

const getOrderForUser= async (req, res) => {
    try {
        const Order = await OrderModel.find({ userId: req?.params?.id }).populate("sellerId").populate("productId");
        return res.status(200).json({ data:Order, msg: "",status: 200 });
    }
    catch (error) {
        console.error("Error creating Post:", error);
        return { success: false, msg: "Failed to create Post" };
    }
};

const markAsDelivered = async (req, res)=>{
    try {
        const Order = await OrderModel.findByIdAndUpdate(req?.params?.id,{delivered:true },{new:true})
        console.log(Order,'Order')
        return res?.status(200).json({data:Order})
    } 
    catch (error) {
        console.log(error)
    }
}

module.exports = {createOrder,getOrderForSeller,getOrderForUser,markAsDelivered}
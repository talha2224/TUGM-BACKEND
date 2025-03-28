const { NotificationModel } = require("../models/notification.model");


const createNotification = async (req,res) => {
    try {
        const notifications = await NotificationModel.create(req.body)
        return res.status(200).json({ data: notifications, msg:null, status: 200 })
    } 
    catch (error) {
        console.error("Error fetching notifications:", error);
        return { success: false, msg: "Failed to fetch notifications" };
    }
};

const getUserNotifications = async (req,res) => {
    try {
        const notifications = await NotificationModel.find({userId:req.params.id }).populate("invitedBy").sort({ createdAt: -1 });
        return res.status(200).json({ data: notifications, msg:null, status: 200 })
    } 
    catch (error) {
        console.error("Error fetching notifications:", error);
        return { success: false, msg: "Failed to fetch notifications" };
    }
};

module.exports = {getUserNotifications,createNotification};

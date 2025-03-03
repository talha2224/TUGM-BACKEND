const { NotificationModel } = require("../models/notification.model");

// const createNotification = async (userId, msg) => {
//     try {
//         const notification = new NotificationModel({ userId, msg });
//         await notification.save();
//         return { success: true, msg: "Notification created successfully", notification };
//     } catch (error) {
//         console.error("Error creating notification:", error);
//         return { success: false, msg: "Failed to create notification" };
//     }
// };

const getUserNotifications = async (req,res) => {
    try {
        const notifications = await NotificationModel.find({ userId:req.params.id }).sort({ createdAt: -1 });
        return res.status(200).json({ data: notifications, msg:null, status: 200 })
    } 
    catch (error) {
        console.error("Error fetching notifications:", error);
        return { success: false, msg: "Failed to fetch notifications" };
    }
};

module.exports = {getUserNotifications };

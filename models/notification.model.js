const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    msg: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const NotificationModel = mongoose.model("Notification", notificationSchema, "Notification");

module.exports = { NotificationModel };

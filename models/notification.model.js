const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    streamId: {type:String},
    createdAt: { type: Date, default: Date.now }
});

const NotificationModel = mongoose.model("Notification", notificationSchema, "Notification");

module.exports = { NotificationModel };

const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
  text: { type: String, required: true },
  delivered: { type: Boolean, default: false },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const ChatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true }],
  lastMessage: { type: String, default: null },
  messages: [MessageSchema],
  createdAt: { type: Date, default: Date.now },
});

const ChatModel = mongoose.model("Chat", ChatSchema, "Chat");

module.exports = { ChatModel };

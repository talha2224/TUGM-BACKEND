const express = require("express");
const { createChat, getChatMessages, sendMessage, getUserChats } = require("../services/chat.service");
const router = express.Router();
router.post("/create", createChat);
router.get("/:chatId/messages", getChatMessages);
router.post("/:chatId/message", sendMessage);
router.get("/user/:userId", getUserChats);
module.exports = router;

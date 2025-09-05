const mongoose = require("mongoose");

const battleMessageSchema = new mongoose.Schema({
    battleId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    message: { type: String, required: true },
}, { timestamps: true });

const BattleMessage = mongoose.model("BattleMessage", battleMessageSchema, "BattleMessage");
module.exports = BattleMessage;

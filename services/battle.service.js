const LiveBattle = require("../models/battle.model");
const { NotificationModel } = require("../models/notification.model");
const BattleMessage = require("../models/battleMessage.model");
const { generateZegoStream, uploadFile } = require("../utils/function");
const { emitToUser } = require("../config/socket.config");

const createBattle = async (req, res) => {
    try {
        const { name, creatorId, opponentId, productId } = req.body;
        let image = req.file
        let url = await uploadFile(image);
        const { streamId, token } = await generateZegoStream(creatorId);
        const newStream = new LiveBattle({ name, creatorId, streamId, token, coverImage: url, opponentId, productId });
        await newStream.save();
        if (newStream?._id) {
            await NotificationModel.create({ streamId, invitedBy: creatorId, userId: opponentId, type: "battle" })
            res.status(200).json({ data: newStream, msg: "Battle Created" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getActive = async (req, res) => {
    try {
        const activeStreams = await LiveBattle.find({ status: "active" }).populate("creatorId").populate("opponentId").populate("productId")
        res.status(200).json({ data: activeStreams, msg: "" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getCreatorActiveBattle = async (req, res) => {
    try {
        const activeStream = await LiveBattle.findOne({ streamId: req?.params?.id })
            .populate("creatorId")
            .populate("opponentId")
            .populate("productId"); // ✅ added populate

        res.status(200).json({ data: activeStream, msg: "" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const endBattle = async (req, res) => {
    try {
        const stream = await LiveBattle.findByIdAndUpdate(req.params.id, { status: "ended" }, { new: true });
        if (!stream) return res.status(404).json({ error: "Battle not found" });
        return res.status(200).json({ data: stream, msg: "Battle Ended", status: 200 });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getSingle = async (req, res) => {
    try {
        const stream = await LiveBattle.findById(req.params.id)
            .populate("creatorId")
            .populate("opponentId")
            .populate("productId");

        return res.status(200).json({ data: stream, msg: "", status: 200 });
    } catch (error) {
        console.error("Error fetching battle:", error);
        res.status(500).json({ error: "Failed to fetch battle" });
    }
};
const increaseVote = async (req, res) => {
    try {
        const { battleId, type } = req.body;

        if (!["creator", "opponent"].includes(type)) {
            return res.status(400).json({ error: "Invalid vote type" });
        }

        // 1. Update vote count
        const updateField = type === "creator"
            ? { $inc: { creatorVotes: 1 } }
            : { $inc: { opponentVotes: 1 } };

        const updatedBattle = await LiveBattle.findOneAndUpdate(
            { streamId: battleId },
            updateField,
            { new: true }
        ).populate("creatorId opponentId");

        if (!updatedBattle) {
            return res.status(404).json({ error: "Battle not found" });
        }

        // 2. Decide winner
        let winner = null;
        if (updatedBattle.creatorVotes > updatedBattle.opponentVotes) {
            winner = updatedBattle.creatorId._id;
        } else if (updatedBattle.opponentVotes > updatedBattle.creatorVotes) {
            winner = updatedBattle.opponentId._id;
        }

        if (winner) {
            updatedBattle.winnerId = winner;
            await updatedBattle.save();
        }
        emitToUser(battleId.toString(), "voteUpdate", updatedBattle);

        res.status(200).json({ data: updatedBattle, msg: "Vote added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createMessage = async (req, res) => {
    try {
        const { battleId, userId, message } = req.body;
        if (!battleId || !userId || !message) {
            return res.status(400).json({ error: "battleId, userId and message are required" });
        }
        const newMessage = new BattleMessage({ battleId, userId, message });
        await newMessage.save();
        const populatedMessage = await BattleMessage.findById(newMessage._id).populate("userId");
        emitToUser(battleId.toString(), "newMessage", populatedMessage);

        res.status(200).json({ data: populatedMessage, msg: "Message sent" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getMessages = async (req, res) => {
    try {
        const { battleId } = req.params;
        const messages = await BattleMessage.find({ battleId }).populate("userId").sort({ createdAt: 1 });
        res.status(200).json({ data: messages, msg: "Messages fetched" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createBattle, getActive, getCreatorActiveBattle, endBattle, getSingle, increaseVote, createMessage, getMessages }
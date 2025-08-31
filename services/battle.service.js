const LiveBattle = require("../models/battle.model");
const { NotificationModel } = require("../models/notification.model");
const { generateZegoStream, uploadFile } = require("../utils/function");

const createBattle = async (req, res) => {
    try {
        const { name, creatorId, opponentId } = req.body;
        let image = req.file
        let url = await uploadFile(image);
        const { streamId, token } = await generateZegoStream(creatorId);
        const newStream = new LiveBattle({ name, creatorId, streamId, token, coverImage: url, opponentId });
        await newStream.save();
        if(newStream?._id){
            console.log("Battle Created")
            await NotificationModel.create({streamId,invitedBy:creatorId,userId:opponentId,type:"battle"})
            res.status(200).json({ data: newStream, msg: "Battle Created" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getActive = async (req, res) => {
    try {
        const activeStreams = await LiveBattle.find({ status: "active" }).populate("creatorId").populate("opponentId")
        res.status(200).json({ data: activeStreams, msg: "" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getCreatorActiveBattle = async (req, res) => {
    try {
        const activeStreams = await LiveBattle.findOne({ streamId: req?.params?.id }).populate("creatorId").populate("opponentId")
        res.status(200).json({ data: activeStreams, msg: "" });
    }
    catch (error) {
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
        const stream = await LiveBattle.findById(req.params.id);
        return res.status(200).json({ data: stream, msg: "", status: 200 });
    }
    catch (error) {
        console.error("Error deleting note:", error);
        return { success: false, msg: "Failed to delete note" };
    }
};


module.exports = { createBattle, getActive, getCreatorActiveBattle, endBattle, getSingle }
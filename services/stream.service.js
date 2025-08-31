const { generateZegoStream, uploadFile, generateAgoraToken } = require("../utils/function");
const LiveStream = require("../models/stream.model");

const createStream = async (req, res) => {
    try {
        const { startingBid, creatorId, productId } = req.body;
        let image = req.file
        let url = await uploadFile(image);
        const { streamId, token } = await generateZegoStream(creatorId);
        const newStream = new LiveStream({ startingBid, creatorId, streamId, token, coverImage: url, productId });
        await newStream.save();
        res.status(200).json({ data: newStream, msg: "Stream Started" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getActive = async (req, res) => {
    try {
        const activeStreams = await LiveStream.find({ status: "active" }).populate("creatorId");
        res.status(200).json({ data: activeStreams, msg: "" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getCreatorActiveStream = async (req, res) => {
    try {
        const activeStreams = await LiveStream.findOne({ streamId: req?.params?.id }).populate("creatorId").populate("productId")
        res.status(200).json({ data: activeStreams, msg: "" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const endStream = async (req, res) => {
    try {
        const stream = await LiveStream.findByIdAndUpdate(req.params.id, { status: "ended" }, { new: true });
        if (!stream) return res.status(404).json({ error: "Stream not found" });
        return res.status(200).json({ data: stream, msg: "Stream Ended", status: 200 });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSingle = async (req, res) => {
    try {
        const stream = await LiveStream.findById(req.params.id);
        return res.status(200).json({ data: stream, msg: "", status: 200 });
    }
    catch (error) {
        console.error("Error deleting note:", error);
        return { success: false, msg: "Failed to delete note" };
    }
};

const getToken = async (req, res) => {
    try {
        let id = req.params.id
        let role = req.params.role
        let token = await generateAgoraToken(id, role)
        return res.status(200).json({ data: token })
    }
    catch (error) {
        console.log(error)
    }
}
module.exports = { createStream, getActive, getSingle, endStream, getCreatorActiveStream, getToken };

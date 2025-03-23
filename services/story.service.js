const { StoryModel } = require("../models/story.model");
const { uploadFile } = require("../utils/function");


const createStory = async (req, res) => {
    try {
        let { userId } = req.body;
        let files = req.files?.assets || [];
        let assets = [];

        for (const element of files) {
            let recordingUrl = await uploadFile(element);
            assets.push(recordingUrl);
        }

        console.log(assets, 'assets')

        let data = await StoryModel.create({ assets, userId });
        return res.status(200).json({ data, msg: "Story Created", status: 200 });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error", status: 500 });
    }
};


const getAllStory = async (req, res) => {
    try {
        let data = await StoryModel.find({isActive:true}).populate("userId");
        return res.status(200).json({ data, msg: "All Story", status: 200 });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error", status: 500 });
    }
};




module.exports = { createStory, getAllStory }
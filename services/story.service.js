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

const updateViewers=async (req,res)=>{
    try {
        let {id} = req?.params
        let {uId} = req?.body
        let isExits = await StoryModel.findById(id)
        if(isExits){
            let updatedViewers =[]
            let isIncludes=isExits?.viewers?.includes(uId)
            updatedViewers= isIncludes?[...isExits?.viewers,uId]:[...isExits?.viewers]
            console.log(updatedViewers,'updatedViewers')
            let update = await StoryModel.findByIdAndUpdate(id,{viewers:updatedViewers},{new:true})
            return res.status(200).json({ data:update, msg: "Viewers Updated", status: 200 });
        }
    } 
    catch (error) {
        console.log(error)
    }
}
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




module.exports = { createStory, getAllStory,updateViewers }
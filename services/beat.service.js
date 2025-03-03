const { BeatModel } = require("../models/beat.model");
const { uploadFile } = require("../utils/function");



const postBeat = async (req,res) =>{
    try {
        let {title} = req.body
        let image = req.files.image && req.files.image;
        let audio = req.files.audio && req.files.audio;
        let recordingUrl = await uploadFile(audio);
        let imageUrl = await uploadFile(image);
        let data = await BeatModel.create({title,audio:recordingUrl,image:imageUrl})
        return res.status(200).json({data:data,msg:"Beat Posted",status:200})
    } 
    catch (error) {
        console.log(error)
    }
}
const getAllBeat = async (req,res) =>{
    try {
        let data = await BeatModel.find()
        return res.status(200).json({data:data,msg:"",status:200})
    } 
    catch (error) {
        console.log(error)
    }
}

module.exports = {postBeat,getAllBeat}
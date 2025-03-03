const mongoose = require("mongoose");

const beatSchema = new mongoose.Schema({
    audio: { type: String, required: true },
    image:{type: String, required: true },
    title:{type:String,required:true}
});

const BeatModel = mongoose.model("Beat", beatSchema, "Beat");

module.exports = { BeatModel };

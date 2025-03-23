const mongoose = require("mongoose")



const storySchema = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"Account"},
    assets:{type:Array,default:[]},
    isActive:{type:Boolean,default:true},
    createdAt: { type: Date, default: Date.now }
})



const StoryModel = mongoose.model("Story",storySchema,"Story")


module.exports ={ StoryModel }
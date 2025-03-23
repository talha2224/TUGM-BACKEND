const mongoose = require("mongoose")



const AccountSchema = mongoose.Schema({
    username:{type:String,default:null},
    email:{type:String,required:true},
    password:{type:String},
    registrationType:{type:String,default:"normal"},
    sellerMode:{type:Boolean,default:false},
    profile:{type:String,default:null},
    followers:{type:Number,default:0},
    followedBy:{type:Array,default:[]},
    coins:{type:Number,default:0}
})



const AccountModel = mongoose.model("Account",AccountSchema,"Account")


module.exports ={ AccountModel }
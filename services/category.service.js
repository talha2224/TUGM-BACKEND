const { CategoryModel } = require("../models/category.model");

const postCategory = async (req,res) =>{
    try {
        let data = await CategoryModel.create(req.body)
        return res.status(200).json({data:data,msg:"Category Saved",status:200})
    } 
    catch (error) {
        console.log(error)
    }
}
const getAllCategory = async (req,res) =>{
    try {
        let data = await CategoryModel.find({})
        return res.status(200).json({data:data,msg:"",status:200})
    } 
    catch (error) {
        console.log(error)
    }
}

module.exports = {postCategory,getAllCategory}
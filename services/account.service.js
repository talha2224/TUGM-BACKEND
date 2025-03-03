const { AccountModel } = require("../models/account.model");
const bcrypt = require("bcryptjs")
const { generatePin, uploadFile } = require("../utils/function");
const { sendDynamicMail } = require("../utils/email");







const createAccount = async (req, res) => {
    try {
        let {username, email, password } = req.body
        console.log(email,'email')
        let findUser = await AccountModel.findOne({ email })
        if (findUser) {
            return res.status(400).json({ data: null, msg: "Account already exits", code: 200 })
        }
        else {
            let hash = await bcrypt.hash(password, 10)
            let result = await AccountModel.create({username,email,password:hash,registrationType:"normal" })
            return res.status(200).json({ data: result, msg: "Account Created Please Complete Your Profile", status: 200 })

        }
    }
    catch (error) {
        console.log(error)
    }
}
const createGoogleAccount = async (req, res) => {
    try {
        let { email,username } = req.body
        let findUser = await AccountModel.findOne({ email})
        if (findUser) {
            return res.status(400).json({ data: null, msg: "Account already exits", code: 400 })
        }
        else {
            let result = await AccountModel.create({username,email,registrationType:"google"})
            return res.status(200).json({ data: result, msg: "Account Created Please Complete Your Profile", status: 200 })

        }
    }
    catch (error) {
        console.log(error)
    }
}
const loginAccount = async (req, res) => {
    try {
        let { email, password, } = req.body
        let findUser = await AccountModel.findOne({ email,registrationType:"normal" })
        if (!findUser) {
            return res.status(400).json({ data: null, msg: "Account not exits", code: 400 })
        }
        else {
            let compare = await bcrypt.compare(password, findUser.password)
            if (compare) {
                return res.status(200).json({ data: findUser, msg: "Login Sucessful", code: 200 })
            }
            else {
                return res.status(403).json({ data: null, msg: "Invalid credentails", code: 403 })
            }
        }
    }
    catch (error) {
        console.log(error)
    }
}
const loginGoogleAccount = async (req, res) => {
    try {
        let { email } = req.body
        let findUser = await AccountModel.findOne({ email,registrationType:"google" })
        if (!findUser) {
            return res.status(400).json({ data: null, msg: "Account not exits", code: 400 })
        }
        else {
            return res.status(200).json({ data: findUser, msg: "Login Sucessful", code: 200 })
        }
    }
    catch (error) {
        console.log(error)
    }
}

const switchProfileMode = async (req, res) => {
    try {
        let {id} = req.params
        let {sellerMode} = req.body
        let findUser = await AccountModel.findById(id)
        if (!findUser) {
            return res.status(400).json({ data: null, msg: "Account not exits invalid account id pass", code: 400 })
        }
        else {
            let result = await AccountModel.findByIdAndUpdate(id,{sellerMode:sellerMode},{new:true})
            return res.status(200).json({ data: result, msg: "Profile Info Added", status: 200 })
        }
    }
    catch (error) {
        console.log(error)
    }
}

const getAccountById = async (req, res) => {
    try {
        let findUser = await AccountModel.findById(req.params.id)
        return res.status(200).json({ data: findUser, code: 200 })

    }
    catch (error) {
        console.log(error)
    }
}
const getAllAccount = async (req, res) => {
    try {
        let findUser = await AccountModel.find()
        return res.status(200).json({ data: findUser, code: 200 })

    }
    catch (error) {
        console.log(error)
    }
}

const uploadPicture = async (req,res)=>{
    try {
        let { id } = req.params;
        let image = req.file
        let url = await uploadFile(image);
        let updateProfile = await AccountModel.findByIdAndUpdate(id,{profile:url},{new:true})
        return res.status(200).json({data:updateProfile,msg:"Profile Picture Updated"})
    } 
    catch (error) {
        console.log(error)
    }
}


module.exports = {uploadPicture,createAccount, loginAccount, getAccountById,getAllAccount,switchProfileMode,createGoogleAccount,loginGoogleAccount}
const router = require("express").Router()
const { multipleupload } = require("../config/multer.config")
const { createAccount, loginAccount, getAccountById, getAllAccount, createGoogleAccount, loginGoogleAccount, uploadPicture, switchProfileMode, followCreator, buyCoins, subscribeUser, } = require("../services/account.service")

router.post("/register",createAccount)
router.post("/login",loginAccount)
router.post("/register-google",createGoogleAccount)
router.post("/login-google",loginGoogleAccount)
router.put("/switch/profile/:id",switchProfileMode)
router.put("/change/profile/:id",multipleupload.single("image"),uploadPicture)
router.get("/single/:id",getAccountById)
router.get("/all",getAllAccount)
router.put("/follow/:uid/:cid",followCreator)
router.put("/buy/:id",buyCoins)
router.get("/subscribe/:id",subscribeUser)



module.exports = router
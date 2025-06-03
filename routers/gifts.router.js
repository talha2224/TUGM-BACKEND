const { multipleupload } = require("../config/multer.config")
const { createGift, getGift, deleteGift } = require("../services/gifts.service")
const router = require("express").Router()

router.post("/create",multipleupload.single("image"),createGift)
router.get("/all",getGift)
router.delete('/:id', deleteGift);


module.exports = router
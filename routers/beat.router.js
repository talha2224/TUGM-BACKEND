const router = require("express").Router()
const { multipleupload } = require("../config/multer.config")
const { postBeat, getAllBeat } = require("../services/beat.service")

router.post("/create",multipleupload.fields([{ name: 'image', maxCount: 1 },{ name: 'audio', maxCount: 1}]),postBeat)
router.get("/all",getAllBeat)


module.exports = router
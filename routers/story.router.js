const { multipleupload } = require("../config/multer.config")
const { createStory, getAllStory, updateViewers } = require("../services/story.service")
const router = require("express").Router()

router.post("/create",multipleupload.fields([{ name: "assets", maxCount: 3 }]),createStory)
router.get("/all",getAllStory)
router.put("/update/:id",updateViewers)


module.exports = router
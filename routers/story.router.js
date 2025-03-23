const { multipleupload } = require("../config/multer.config")
const { createStory, getAllStory } = require("../services/story.service")
const router = require("express").Router()

router.post("/create",multipleupload.fields([{ name: "assets", maxCount: 3 }]),createStory)
router.get("/all",getAllStory)


module.exports = router
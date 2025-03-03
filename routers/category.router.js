const { postCategory, getAllCategory } = require("../services/category.service")
const router = require("express").Router()

router.post("/create",postCategory)
router.get("/all",getAllCategory)


module.exports = router
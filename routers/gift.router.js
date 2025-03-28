const { createGift, getGift } = require("../services/gift.service")
const router = require("express").Router()


router.post("/create",createGift)
router.get("/:userId/:streamId",getGift)


module.exports = router
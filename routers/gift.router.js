const { createGift, getGift, getGiftHost, getAll } = require("../services/gift.service")
const router = require("express").Router()


router.post("/create",createGift)
router.get("/:userId/:streamId",getGift)
router.get("/host/:userId/:streamId",getGiftHost)
router.get("/all",getAll)


module.exports = router
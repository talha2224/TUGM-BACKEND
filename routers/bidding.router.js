const router = require("express").Router()
const {getAllBidding } = require("../services/bidding.service")

router.get("/all/:id",getAllBidding)


module.exports = router
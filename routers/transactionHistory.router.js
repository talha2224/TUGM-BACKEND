const {getAllHistory} = require("../services/transactionHistory.service")
const router = require("express").Router()

router.get("/all",getAllHistory)

module.exports = router

const { createOrder, getOrderForSeller, getOrderForUser, markAsDelivered, changeStatus, printLabel } = require("../services/order.service")

const router = require("express").Router()

router.post("/checkout", createOrder)
router.get("/user/:id", getOrderForUser)
router.get("/seller/:id", getOrderForSeller)
router.get("/delivered/:id", markAsDelivered)
router.put("/status/:id", changeStatus)
router.post("/print/:id", printLabel)

module.exports = router
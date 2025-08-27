const { createOrder, getOrderForSeller, getOrderForUser, markAsDelivered, changeStatus } = require("../services/order.service")

const router = require("express").Router()

router.post("/checkout", createOrder)
router.get("/user/:id", getOrderForUser)
router.get("/seller/:id", getOrderForSeller)
router.get("/delivered/:id", markAsDelivered)
router.put("/status/:id", changeStatus)

module.exports = router
const { createOrder, getOrderForSeller, getOrderForUser, markAsDelivered } = require("../services/order.service")

const router = require("express").Router()

router.post("/checkout",createOrder)
router.get("/user/:id",getOrderForUser)
router.get("/seller/:id",getOrderForSeller)
router.get("/delivered/:id",markAsDelivered)

module.exports = router
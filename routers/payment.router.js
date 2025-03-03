const { createPaymentIntent } = require("../services/payment.service")

const router = require("express").Router()


router.post("/create-intent",createPaymentIntent)

module.exports = router

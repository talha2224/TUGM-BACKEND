const { createUpdatePrice, getPrice } = require("../services/price.service");

const router = require("express").Router()

router.post("/create",createUpdatePrice)
router.get("/all",getPrice)


module.exports = router
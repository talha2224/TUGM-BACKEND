const { create, getAll, updateTerm } = require("../services/terms.service")

const router = require("express").Router()

router.post("/create",create)
router.get("/all",getAll)
router.put("/update/:id",updateTerm)

module.exports = router
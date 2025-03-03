const router = require("express").Router()
const { getUserNotifications } = require("../services/notification.service")

router.get("/get/:id",getUserNotifications)


module.exports = router
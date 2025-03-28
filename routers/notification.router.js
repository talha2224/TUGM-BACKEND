const router = require("express").Router()
const { getUserNotifications, createNotification } = require("../services/notification.service")

router.get("/get/:id",getUserNotifications)
router.post("/invite",createNotification)


module.exports = router
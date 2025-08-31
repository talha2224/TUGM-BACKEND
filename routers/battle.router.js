const { multipleupload } = require("../config/multer.config")
const { createBattle, getActive, getCreatorActiveBattle, endBattle, getSingle  } = require("../services/battle.service")
const router = require("express").Router()

router.post("/create",multipleupload.single("image"),createBattle)
router.get("/active",getActive)
router.get("/single/:id",getSingle)
router.get("/info/:id",getCreatorActiveBattle)
router.put("/end/:id",endBattle)

module.exports = router
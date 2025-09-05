const { multipleupload } = require("../config/multer.config")
const { createBattle, getActive, getCreatorActiveBattle, endBattle, getSingle, increaseVote, createMessage, getMessages  } = require("../services/battle.service")
const router = require("express").Router()

router.post("/create",multipleupload.single("image"),createBattle)
router.get("/active",getActive)
router.get("/single/:id",getSingle)
router.get("/info/:id",getCreatorActiveBattle)
router.put("/end/:id",endBattle)
router.post("/vote", increaseVote);
router.post("/message", createMessage);
router.get("/message/:battleId", getMessages);
module.exports = router
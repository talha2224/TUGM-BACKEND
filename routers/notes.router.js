const { createNote, getUserNotes, deleteNote, getAISuggestion } = require("../services/notes.service")

const router = require("express").Router()

router.post("/create",createNote)
router.get("/get/:id",getUserNotes)
router.post("/get/ai/suggestion",getAISuggestion)
router.delete("/del/:id",deleteNote)

module.exports = router
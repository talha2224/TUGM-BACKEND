const mongoose = require("mongoose");

const termsSchema = new mongoose.Schema({
    term: { type: String, required: true },
});

const TermsModel = mongoose.model("Terms", termsSchema, "Terms");

module.exports = { TermsModel };

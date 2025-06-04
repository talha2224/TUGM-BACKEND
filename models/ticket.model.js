const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", default: null },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String,default:"Normal"},
    createdAt: { type: Date, default: Date.now }
});

const TicketModel = mongoose.model("Ticket", ticketSchema, "Ticket");

module.exports = { TicketModel };

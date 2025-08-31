const mongoose = require("mongoose");

const BattleSchema = new mongoose.Schema({

    name: { type: String, required: true },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    opponentId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    winnerId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", default: null },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", default: null },
    creatorVotes: { type: Number, default: 0 },
    opponentVotes: { type: Number, default: 0 },
    coverImage: { type: String, required: true },

    streamId: { type: String, required: true },
    token: { type: String, required: true },
    status: { type: String, enum: ["active", "ended"], default: "active" },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Battle", BattleSchema);


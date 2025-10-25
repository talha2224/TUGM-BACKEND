const mongoose = require("mongoose");

const LiveStreamSchema = new mongoose.Schema({
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    productId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    startingBid: { type: Number, required: true },
    coverImage: { type: String, required: true },
    streamId: { type: String, required: true },
    token: { type: String, required: true },
    status: { type: String, enum: ["active", "ended"], default: "active" },
    createdAt: { type: Date, default: Date.now },
});
LiveStreamSchema.path("productId").default(() => []);
module.exports = mongoose.model("LiveStream", LiveStreamSchema);


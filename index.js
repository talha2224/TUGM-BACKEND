const express = require("express");
const cors = require("cors");
const http = require("http");
const cron = require("node-cron");
const dbConnection = require("./config/db.config");
const combineRouter = require("./routers/index");
const { AccountModel } = require("./models/account.model");
const { BiddingModel } = require("./models/bidding.model");
const { StoryModel } = require("./models/story.model");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3002;
const server = http.createServer(app);

const io = require("socket.io")(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/api/v1", combineRouter);
dbConnection();

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("joinStream", (streamId) => {
        socket.join(streamId);
        console.log(`User joined stream: ${streamId}`);
    });

    socket.on("sendGift", async (data) => {
        let findUser = await AccountModel.findById(data?.userId)
        await AccountModel.findByIdAndUpdate(data?.userId, { coins: findUser?.coins - data?.coins }, { new: true })
        io.to(data.streamId).emit("receiveGift", data);
    });

    socket.on("bid", async (data) => {
        console.log("Bid received:", data);
        let findUser = await AccountModel.findById(data?.userId)
        await BiddingModel.create(data)
        io.to(data.streamId2).emit("receiveBid", { ...data, ...findUser });
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
        socket.removeAllListeners();
    });
});
cron.schedule("0 * * * *", async () => {
    try {
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

        const result = await StoryModel.updateMany({ createdAt: { $lt: twentyFourHoursAgo }, isActive: true }, { $set: { isActive: false } });

        console.log(`Deactivated ${result.modifiedCount} stories`);
    }
    catch (error) {
        console.error("Error deactivating stories:", error);
    }
});
// Start server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const express = require("express");
const cors = require("cors");
const http = require("http"); // Import HTTP module
const dbConnection = require("./config/db.config");
const combineRouter = require("./routers/index");
const { AccountModel } = require("./models/account.model");
const { BiddingModel } = require("./models/bidding.model");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3002;
const server = http.createServer(app);

const io = require("socket.io")(server, {cors: { origin: "*", methods: ["GET", "POST"] }});

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

    socket.on("sendGift", async(data) => {
        let findUser = await AccountModel.findById(data?.userId)
        await AccountModel.findByIdAndUpdate(data?.userId,{coins:findUser?.coins-data?.coins},{new:true})
        io.to(data.streamId).emit("receiveGift", data); 
    });

    socket.on("bid", async(data) => {
        console.log("Bid received:", data);
        let findUser = await AccountModel.findById(data?.userId)
        await BiddingModel.create(data)
        io.to(data.streamId2).emit("receiveBid", {...data,...findUser}); 
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
        socket.removeAllListeners();
    });
});

// Start server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

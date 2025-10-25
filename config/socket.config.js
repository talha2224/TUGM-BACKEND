let ioInstance;

const setupSocket = (io) => {
    ioInstance = io;

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);
        socket.on("join", (data) => {
            let streamId;
            try {
                const parsedData = typeof data === "string" && data.includes("{") ? JSON.parse(data) : { streamId: data };
                streamId = parsedData.streamId;
            } catch (e) {
                console.error("Failed to parse join data:", e);
                return;
            }

            if (streamId) {
                socket.join(streamId.streamId);
                console.log(`User ${streamId.streamId} joined their room`);
            } else {
                console.log(
                    "Received 'join' event but streamId was undefined or missing."
                );
            }
        });
        socket.on("sendPerk", (data) => {
            console.log(data.streamId, 'data of sendPerk')
            io.to(data.streamId).emit("newPerk", data);
        });
        socket.on("sendMessage", (payload) => { console.log("sendMessage received:", payload); });
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};

const emitToUser = (streamId, event, data) => {
    console.log(`🚀 Emitting event "${event}" to room: ${streamId}`);
    if (ioInstance) ioInstance.to(streamId).emit(event, data);
};


module.exports = { setupSocket, emitToUser };

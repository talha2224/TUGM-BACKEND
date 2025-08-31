let ioInstance;

const setupSocket = (io) => {
    ioInstance = io;

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);
        socket.on("join", (data) => {
            let roomId;
            try {
                const parsedData = typeof data === "string" && data.includes("{")? JSON.parse(data): { roomId: data };
                roomId = parsedData.roomId;
            } catch (e) {
                console.error("Failed to parse join data:", e);
                return;
            }

            if (roomId) {
                socket.join(roomId);
                console.log(`User ${roomId} joined their room`);
            } else {
                console.log(
                    "Received 'join' event but roomId was undefined or missing."
                );
            }
        });
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};

const emitToUser = (roomId, event, data) => {
    if (ioInstance) {
        ioInstance.to(roomId).emit(event, data);
    }
};

module.exports = { setupSocket, emitToUser };

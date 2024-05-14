const { Server } = require("socket.io");

let io;

function initServer(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.BASE_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("join", (userId) => {
      socket.join(userId);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
}

function getIo() {
  if (!io) throw new Error("Socket.io not initialize");

  return io;
}

module.exports = { initServer, getIo };

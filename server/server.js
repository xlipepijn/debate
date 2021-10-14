const io = require("socket.io")(3001, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});
let amountJoined = 0;
io.on("connection", (socket) => {
  console.log("connected");

  socket.on("join-room", (room) => {
    socket.join(room);
    var amountJoined = io.sockets.adapter.rooms.get(room).size;

    if (amountJoined >= 2) {
      io.to(room).emit("challenger joined");
    }

    socket.on("disconnect", () => {
      io.to(room).emit("partner-left");
      console.log(
        `player ${
          amountJoined != 1 ? amountJoined - 1 : amountJoined
        } left the conversation`
      );
    });
    console.log(`Joined room: ${room}`);
    console.log(`Player number: ${amountJoined}`);
    socket.on("send-message", ({ userId, text }) => {
      io.to(room).emit("receive-message", { userId: userId, text: text });
    });
    socket.on("rate-opponent", rating => {
      console.log(rating)
      socket.broadcast.to(room).emit('receive-feedback', rating)
    });
  });
});

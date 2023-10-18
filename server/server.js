
const PORT = process.env.PORT || 3001;
// const PORT = 3001;

const io = require("socket.io")(PORT, {
  cors: {
    origin: ["https://debate-pepijnei.vercel.app/", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// const io = require('socket.io')()

let amountJoined = 0;
io.on("connection", (socket) => {
  console.log("connected");

  socket.on("join-lobby", () => {
    console.log("user joined lobby");
    socket.join("lobby");
    let usersInLobby = io.sockets.adapter.rooms.get("lobby").size;
    console.log(usersInLobby)
    io.emit("user joined lobby", usersInLobby);
  });

  socket.on("join-room", (room) => {
    socket.join(room);
    let amountJoined = io.sockets.adapter.rooms.get(room).size;

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
    socket.on("rate-opponent", (rating) => {
      console.log(rating);
      socket.broadcast.to(room).emit("receive-feedback", rating);
    });
    socket.on('currently typing', () => {
      socket.broadcast.to(room).emit('currently typing')
    })
    socket.on("stopped typing", () => {
      socket.broadcast.to(room).emit("stopped typing");
    });
  });
});

// io.listen(process.env.PORT || 3001)


// const server = express()
const PORT = process.env.PORT || 3001;
// const io = socketIO(server)

const io = require("socket.io")(PORT, {
  cors: {
    origin: ["https://gracious-mirzakhani-0dd9d5.netlify.app"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// const io = require('socket.io')()

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

// io.listen(process.env.PORT || 3001)
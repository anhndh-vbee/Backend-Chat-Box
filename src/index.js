const express = require("express");
const cors = require("cors");
const configs = require("./configs");
const router = require("./routes");
const connectDB = require("./configs/connectDB");

const app = express();
const socketIO = require("socket.io");
const port = configs.PORT || 8089;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

connectDB();

const server = app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:8080",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("chatMessage", (data) => {
    io.emit("chatMessage", { data });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

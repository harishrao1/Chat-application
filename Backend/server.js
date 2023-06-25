const http = require("http");
const express = require("express");

const socketIO = require("socket.io");
const cors = require("cors");

const corsOptions = {
  origin: "https://chat-application-rosy-nu.vercel.app/", // frontend
};
const app = express();
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("ITS WORKING");
});

const server = http.createServer(app);
const io = socketIO(server);

let likes = {};

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat message", (message) => {
    io.emit("message", message);
  });

  socket.on("like", (messageId) => {
    likes[messageId] = (likes[messageId] || 0) + 1;
    io.emit("like", likes);
  });
  socket.on("disconnect", () => {
    console.log("A user Disconnected");
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

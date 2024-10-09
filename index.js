const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");
const ejs = require("ejs");

const app = express();

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

server.listen(3000, console.log(`Server running at 3000`));

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send-location", (data) => {
    io.emit("receive-location", { id: socket.id, ...data });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    io.emit("user-disconnected", socket.id);
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

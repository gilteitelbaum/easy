const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const chatRooms = require('./routes/chatRooms');
var cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/chatrooms', chatRooms);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/chat")
  .then(() => console.log("connected to mongodb"))
  .catch(err => console.error("could not connect to database", err));


const server = http.createServer(app);
const io = new Server(server, {
  path: "/ws",
});
app.locals.io = io;

io.on("connection", (socket) => {
  console.log("User connected");
  io.emit("newmesssage", "testing 1 2 3 4444");

});

server.listen(3000, () => { // Should normally get fron environment instead of hard coding
  console.log("Listening on port 3000");
});

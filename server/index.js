const express = require("express");
const http = require("http");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

const server = require("http").createServer(app);

var io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// middleware
app.use(express.json());

const DB =
  "mongodb+srv://crpoudyal:cr123@cluster0.i8fog.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

io.on("connection", (socket) => {
  console.log("Socket Connected: " + socket.id);
  socket.on("createRoom", ({ nickname }) => {
    console.log("Room created by: " + nickname);
  });
});

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to DB !!");
  })
  .catch((e) => {
    console.log("Error on connection : " + e);
  });

server.listen(port, "0.0.0.0", () => {
  console.log(`server is running at PORT ${port}`);
});

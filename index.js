//import express from 'express';
const path = require("path");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

app.set("port", process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname, "public")));

const SocketIO = require("socket.io");
const io = SocketIO(server);

// websocket
io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("chat:message", (data) => {
    console.log("datos: ", data);
    io.sockets.emit("chat:message", data);
  });

  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });
});

//start the server
//app.listen(app.get("port"), () => {
server.listen(app.get("port"), () => {
  console.log("Server on port: ", app.get("port"));
});
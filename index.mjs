import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import mongoose from "mongoose";
import userRoute from "./api/Routes/User.routes.js";
import messageRouter from "./api/Routes/Message.Route.js";
import { log } from "console";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

const port = 3000;
const mongoURI = "mongodb://localhost:27017/";

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Use routes
app.use("/users", userRoute);
app.use("/message", messageRouter);

// Socket.io setup
let connectedUser = {};
io.on("connection", (socket) => {
  let userID;
  console.log("a user connected");
  socket.on("addSocket", (data) => {
    userID = data.id;
    connectedUser[userID] = socket;
    console.log("user added");
  });
  socket.on("sendMessage", (data) => {
    const { receiverID, message, senderID } = data;
    console.log("sendMessageee on sockettttt");
    if (connectedUser.hasOwnProperty(receiverID)) {
      console.log("hereeeeee", message, senderID);
      connectedUser[receiverID].emit("receivedMessage", {
        message,
        senderID,
      });
    }
  });
  socket.on("disconnect", () => {
    delete connectedUser[userID];
    //connectedUser = {};
    console.log("user disconnected", connectedUser, userID);
  });
});

// Start the server
server.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});

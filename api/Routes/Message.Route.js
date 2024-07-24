import express from "express";
import {
  addMessage,
  fetchMessgeByID,
} from "../Controller/Message.controller.js";

const messageRouter = express.Router();

messageRouter.post("/add", addMessage);
messageRouter.get("/get/:id/:receiverID", fetchMessgeByID);
export default messageRouter;

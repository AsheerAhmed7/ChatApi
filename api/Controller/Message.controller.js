import mongoose from "mongoose";
import Message from "../model/Message.model.js";

export const addMessage = async (req, res) => {
  console.log("adddd messaagee");
  try {
    const data = Message(req.body);
    const savedData = await data.save();
    console.log("savedddddDataaaa  ", savedData);
    res.status(200).json({ message: "Success", status: 200, data: savedData });
  } catch (err) {
    res.status(403).json({ message: "Error in saving", status: 403 });
  }
};

export const fetchMessgeByID = async (req, res) => {
  try {
    const id = req.params.id;
    const receiverID = req.params.receiverID;
    console.log("messaageesssss hereee");
    const data = await Message.find({
      $or: [
        { senderID: id, receiverID: receiverID },
        { receiverID: id, senderID: receiverID },
      ],
    });
    console.log("dataaaa   ", data);
    res.status(200).json({ message: "Success", status: 200, data: data });
  } catch (err) {
    console.log("errr ", err);
    res.status(402).json({ message: "Error in finding", status: 402 });
  }
};

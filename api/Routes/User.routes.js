import express from "express";
import {
  addUser,
  fetchPeople,
  findUserByID,
  loginUser,
} from "../Controller/User.controller.js";
const userRoute = express.Router();

userRoute.post("/addUser", addUser);
userRoute.post("/login", loginUser);
userRoute.get("/find/:id", findUserByID);
userRoute.get("/fetchPeople/:id", fetchPeople);

export default userRoute;

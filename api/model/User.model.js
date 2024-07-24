import mongoose from "mongoose";
const subSchema = mongoose.Schema({
  contactID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});
const UserSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contacted: {
    type: [subSchema],
  },
  socketID: {
    type: String,
  },
});
const Users = mongoose.model("Users", UserSchema);
export default Users;

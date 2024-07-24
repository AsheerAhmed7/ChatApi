import Users from "../model/User.model.js";

export const addUser = async (req, res) => {
  try {
    console.log("adddddUserrrr", req.body);
    const data = Users(req.body);
    const savedData = await data.save();
    res.status(200).json({ message: "Success", status: 200, data: savedData });
  } catch (err) {
    res.status(403).json({ message: "Error in saving", status: 403 });
    console.log("errrrr ", err);
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({
      email: email,
      password: password,
    }).populate("contacted.contactID");
    console.log("userrrr innnn  ", user);
    res.status(200).json({ message: "Success", status: 200, data: user });
  } catch (err) {
    res.status(402).json({ message: "Error in finding", status: 402 });
  }
};

export const findUserByID = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Users.findUserByID({ _id: id });
    res.status(200).json({ message: "Success", status: 200, data: user });
  } catch (err) {
    res.status(402).json({ message: "Not Found", status: 402 });
  }
};

export const SearchUser = async (req, res) => {
  const { Name } = req.body;
  try {
    const user = await Users.find({ Name: Name });
    res.status(200).json({ message: "Success", status: 200, data: user });
  } catch (err) {
    res.status(402).json({ message: "Not Found", status: 402 });
  }
};

export const fetchPeople = async (req, res) => {
  const id = req.params.id;
  console.log("hereeeeeeeeeeee");
  try {
    const user = await Users.find({ _id: { $ne: id } });
    console.log("fetchhhhh ", user);
    res.status(200).json({ message: "Success", status: 200, data: user });
  } catch (err) {
    res.status(402).json({ message: "Not Found", status: 402 });
  }
};

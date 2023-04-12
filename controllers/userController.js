const User = require("../models/User");
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.json({ error });
  }
};

const getSingleUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById({ _id: userId }).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ msg: `User with the id ${userId} not found` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.json({ error });
  }
};

const showCurrentUser = async (req, res) => {
  res.send("Show current user");
};

const updateUser = async (req, res) => {
  res.send("Update user");
};

const updateUserPassword = async (req, res) => {
  res.send("update user password");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};

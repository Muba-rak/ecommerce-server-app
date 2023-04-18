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
  res.status(200).json({ user: req.user });
};

const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    return res
      .status(400)
      .json({ message: "Please provide all necessarry values" });
  }

  try {
    const user = User.findByIdAndUpdate(
      { _id: req.user.userId },
      { email, name },
      {
        runValidators: true,
        new: true,
      }
    );
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json({ user: tokenUser });
  } catch (error) {
    res.json({ error });
  }
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

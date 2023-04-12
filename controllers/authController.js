const User = require("../models/User");
const handleErrors = require("../errors/handleError");
const {
  createToken,
  istokenValid,
  attachCookieToResponse,
} = require("../utils");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? "admin" : "user";
    // console.log(req.body.role);

    const user = await User.create({ name, email, password, role });
    const tokenUser = { name: user.name, userId: user._id, role: user.role };
    //const token = await user.generateToken();
    //const token = createToken({ payload: tokenUser });
    // console.log(token);
    attachCookieToResponse({ res, user: tokenUser });
    res.status(201).json({
      data: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.log(error);
    const errors = handleErrors(error);
    res.status(404).json({ errors });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ msg: "Please provide necessary values" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "This email is not registered yet" });
    }
    const authenticated = await user.comparePassword(password);
    if (!authenticated) {
      return res.status(401).json({ msg: "Invalid Email or password" });
    }

    const tokenUser = {
      name: user.name,
      userId: user._id,
      role: user.role,
    };

    attachCookieToResponse({ res, user: tokenUser });
    res.status(201).json({
      data: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.json({ error });
  }
};

const logout = async (req, res) => {
  res.cookie("token", " ", { expires: new Date(Date.now()), httpOnly: true });
  res.status(200).json({ msg: "user logged out" });
};

module.exports = { register, login, logout };

const jwt = require("jsonwebtoken");
const { istokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    console.log("Token e didnt dey");
  }
  console.log("token e dey");
  next();
};

module.exports = { authenticateUser };

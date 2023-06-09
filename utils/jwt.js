const jwt = require("jsonwebtoken");

const createToken = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const istokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookieToResponse = ({ res, user }) => {
  const token = createToken({ payload: user });
  const oneDay = 24 * 60 * 60 * 1000;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

module.exports = { createToken, istokenValid, attachCookieToResponse };

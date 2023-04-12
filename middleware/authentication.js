const { istokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    return res.status(401).json({ msg: "auth failed" });
  }
  try {
    const { name, userId, role } = istokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    return res.status(401).json({ msg: "auth failed" });
  }
};

const authorizePermissions = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "unauthorized to access this route" });
  }
  next();
};

module.exports = { authenticateUser, authorizePermissions };

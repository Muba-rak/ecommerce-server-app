const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

router.route("/").get(authenticateUser, authorizePermissions, getAllUsers);

router.get("/showme", showCurrentUser);
router.patch("/updateuser", updateUser);
router.patch("/updateuserpassword", updateUserPassword);

router.route("/:userId").get(authenticateUser, getSingleUser);
module.exports = router;

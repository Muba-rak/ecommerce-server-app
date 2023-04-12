const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

router.route("/").get(getAllUsers);

router.get('/showme', showCurrentUser)
router.patch('/updateuser', updateUser)
router.patch('/updateuserpassword', updateUserPassword)

router.route("/:userId").get(getSingleUser)
module.exports = router;

const express = require("express");
const {
  readUserData,
  createUser,
  updateUser,
  deleteUser
} = require("../../controller/usersController");
const verifyJWT = require("../../middleware/auth/verifyJWT");

const router = express.Router();

router.post("/", createUser);

router.use(verifyJWT);

router.route("/").get(readUserData).patch(updateUser).delete(deleteUser);

module.exports = router;

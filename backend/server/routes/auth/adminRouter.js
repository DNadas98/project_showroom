const express = require("express");
const verifyJWT = require("../../middleware/auth/verifyJWT");
const verifyRoles = require("../../middleware/auth/verifyRoles");
const {
  createProject,
  updateProject,
  deleteProject,
  addFile,
  updateFile,
  deleteFile
} = require("../../controller/editorProjectsController");
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById
} = require("../../controller/adminUsersController");

const router = express.Router();

router.use(verifyJWT, (req, res, next) => verifyRoles(req, res, next, ["Admin"]));

router.route("/users").get(getAllUsers).patch(updateUserById).delete(deleteUserById);
router.get("/users/:id", getUserById);

router.post("/projects", createProject);
router.patch("/projects/files/add", addFile);
router.patch("/projects/files/update", updateFile);
router.patch("/projects/files/delete", deleteFile);
router.route("/projects/:id").patch(updateProject).delete(deleteProject);

module.exports = router;

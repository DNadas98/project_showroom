const express = require("express");
const verifyJWT = require("../../middleware/auth/verifyJWT");
const verifyRoles = require("../../middleware/auth/verifyRoles");
const {
  login,
  refresh,
  logout,
  validateAccess
} = require("../../controller/authController");

const router = express.Router();

router.post("/login", login);
router.get("/refresh", refresh);
router.post("/logout", logout);

router.use(verifyJWT, (req, res, next) => verifyRoles(req, res, next, ["Admin"]));
router.get("/validate/admin", validateAccess);

module.exports = router;

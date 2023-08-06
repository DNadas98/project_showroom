const express = require("express");
const { forwardGitRequest } = require("../controller/forwardController");

const router = express.Router();

router.get("/git/*", forwardGitRequest);

module.exports = router;

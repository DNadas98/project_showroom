const express = require("express");
const { readAllProjects, readProjectById } = require("../controller/projectsController");

const router = express.Router();

router.get("/", readAllProjects);
router.get("/:id", readProjectById);

module.exports = router;

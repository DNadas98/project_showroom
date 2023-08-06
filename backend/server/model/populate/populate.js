const mongoose = require("mongoose");
const Project = require("../Project");
const dbConnection = require("../../config/dbConnection");
const projects = require("./projects.json");

//only for dev
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../../../../env/backend.env.dev")
});

async function populateProjects() {
  try {
    //connect
    await dbConnection();
    //verify that the DB is empty
    const foundProjects = await Project.find({});
    if (foundProjects?.length > 0) {
      console.log("Projects found in the database, cancelling populate");
      await mongoose.disconnect();
      return null;
    }
    await Project.create([...projects]);
    console.log("Initial projects created successfully.");
  } catch (err) {
    console.error("Error creating initial projects:", err);
  } finally {
    mongoose.disconnect();
  }
}

populateProjects();

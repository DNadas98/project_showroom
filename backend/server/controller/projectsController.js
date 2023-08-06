const projectsModel = require("../model/projectsModel");
const { isValidObjectId } = require("mongoose");
const { logError } = require("../middleware/logger");

//GET /api/projects/
async function readAllProjects(req, res) {
  try {
    const dbQuery = await projectsModel.readAllProjects();
    if (!dbQuery?.result || dbQuery.error || !dbQuery.status) {
      throw new Error(dbQuery?.error ?? "Failed to read projects");
    }
    if (dbQuery.status === 200 && dbQuery.result?.length >= 1) {
      return res.status(dbQuery.status).json({ data: dbQuery.result });
    }
    return res.status(dbQuery.status).json({ message: "No projects found" });
  } catch (err) {
    logError(err, req);
    return res.status(400).json({ message: "Failed to read projects" });
  }
}

//GET /api/projects/:id
async function readProjectById(req, res) {
  try {
    const id = decodeURI(req?.params?.id);
    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }
    const dbQuery = await projectsModel.readProjectById(id);
    if (!dbQuery?.result || dbQuery.error || !dbQuery.status) {
      throw new Error(dbQuery?.error ?? "Failed to read project");
    }
    if (dbQuery?.status === 200 && dbQuery.result) {
      return res.status(200).json({ data: dbQuery.result });
    }
    return res.status(dbQuery?.status ?? 404).json({ message: "Project not found" });
  } catch (err) {
    logError(err, req);
    return res.status(400).json({ message: "Failed to read project" });
  }
}

module.exports = { readAllProjects, readProjectById };

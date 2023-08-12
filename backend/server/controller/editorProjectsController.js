const projectsService = require("../service/projectsService");
const { isValidObjectId } = require("mongoose");
const { logError } = require("../middleware/logger");

//POST /api_priv/admin/projects
async function createProject(req, res) {
  try {
    const { user, repo, readme } = req.body;
    if (!user || !repo || !readme?.path) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const dbSession = await projectsService.createProjectSession(user, repo, readme);
    if (!dbSession?.result || dbSession.error || !dbSession.status) {
      throw new Error(dbSession?.error ?? "");
    }
    return res.status(dbSession.status).json({ "message": dbSession.result });
  } catch (err) {
    logError(err, req);
    return res.status(400).json({ message: "Failed to create project" });
  }
}

//PATCH /api_priv/admin/projects/:id
async function updateProject(req, res) {
  try {
    const _id = decodeURI(req?.params?.id);
    const { user, repo, readme } = req.body;
    if (!_id || !isValidObjectId(_id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }
    if (!user || !repo || !readme?.path) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!readme.language) readme.language = "markdown";
    const dbSession = await projectsService.updateProjectSession(_id, user, repo, readme);
    if (!dbSession?.result || dbSession.error || !dbSession?.status) {
      throw new Error(dbSession?.error ?? "");
    }
    return res.status(dbSession.status).json({ "message": dbSession.result });
  } catch (err) {
    logError(err, req);
    return res.status(400).json({ message: "Failed to update project" });
  }
}

//DELETE /api_priv/admin/projects
async function deleteProject(req, res) {
  try {
    const id = decodeURI(req?.params?.id);
    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }
    const dbQuery = await projectsService.deleteProject(id);
    if (!dbQuery?.result || dbQuery.error || !dbQuery.status) {
      throw new Error(dbQuery?.error ?? "");
    }
    return res.status(dbQuery.status).json({ message: dbQuery.result });
  } catch (err) {
    logError(err, req);
    return res.status(400).json({ message: "Failed to delete project" });
  }
}

//PATCH /api_priv/admin/projects/files/add
async function addFile(req, res) {
  try {
    const { projectId, name, path, language, startLine, endLine, description } = req.body;
    if (!projectId || !isValidObjectId(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }
    if (!name || !path || !language) {
      return res
        .status(400)
        .json({ message: "File name, path and language are required" });
    }
    const dbQuery = await projectsService.addFile(
      projectId,
      name,
      path,
      language,
      startLine,
      endLine,
      description
    );
    if (!dbQuery?.result || dbQuery.error || !dbQuery.status) {
      throw new Error(dbQuery?.error ?? "");
    }
    return res.status(dbQuery.status).json({ message: dbQuery.result });
  } catch (err) {
    logError(err, req);
    return res.status(400).json({ message: "Failed to add file" });
  }
}

//PATCH /api_priv/admin/projects/files/update
async function updateFile(req, res) {
  try {
    const { projectId, fileId, name, path, language, startLine, endLine, description } =
      req.body;
    if (
      !projectId ||
      !isValidObjectId(projectId) ||
      !fileId ||
      !isValidObjectId(fileId)
    ) {
      return res.status(400).json({ message: "Invalid IDs" });
    }
    if (!name || !path || !language) {
      return res
        .status(400)
        .json({ message: "File name, path and language are required" });
    }
    const dbQuery = await projectsService.updateFile(
      projectId,
      fileId,
      name,
      path,
      language,
      startLine,
      endLine,
      description
    );
    if (!dbQuery?.result || dbQuery.error || !dbQuery.status) {
      throw new Error(dbQuery?.error ?? "");
    }
    return res.status(dbQuery.status).json({ message: dbQuery.result });
  } catch (err) {
    logError(err, req);
    return res.status(400).json({ message: "Failed to update file" });
  }
}

//PATCH /api_priv/admin/projects/files/delete
async function deleteFile(req, res) {
  try {
    const { projectId, fileId } = req.body;
    if (
      !projectId ||
      !isValidObjectId(projectId) ||
      !fileId ||
      !isValidObjectId(fileId)
    ) {
      return res.status(400).json({ message: "Invalid IDs" });
    }
    const dbQuery = await projectsService.deleteFile(projectId, fileId);
    if (!dbQuery?.result || dbQuery.error || !dbQuery.status) {
      throw new Error(dbQuery?.error ?? "");
    }
    return res.status(dbQuery.status).json({ message: dbQuery.result });
  } catch (err) {
    logError(err, req);
    return res.status(400).json({ message: "Failed to delete file" });
  }
}

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  addFile,
  updateFile,
  deleteFile
};

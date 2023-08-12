const Project = require("../model/Project");
const { startSession } = require("mongoose");

async function readAllProjects() {
  try {
    const projects = await Project.find().sort({ "createdAt": "asc" }).lean();
    return { status: 200, result: projects };
  } catch (err) {
    return { error: err };
  }
}
async function readProjectById(id) {
  try {
    const project = await Project.findById(id).lean();
    if (project) {
      return { status: 200, result: project };
    }
    return { status: 404, result: "Project not found" };
  } catch (err) {
    return { error: err };
  }
}

async function createProjectSession(user, repo, readme) {
  let session;
  try {
    session = await startSession();
    session.startTransaction();
    const duplicate = await Project.findOne({ "user": user, "repo": repo }).session(
      session
    );
    if (duplicate) {
      await session.abortTransaction();
      session.endSession();
      return {
        status: 409,
        result: `Repository ${repo} of user ${user} already exists as project`
      };
    }
    const created = await Project.create([{ user, repo, readme }], { session });
    if (!created) {
      throw new Error();
    }
    await session.commitTransaction();
    session.endSession();

    return { status: 200, result: "Project created" };
  } catch (err) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    return { error: err };
  }
}

async function updateProjectSession(_id, user, repo, readme) {
  let session;
  try {
    session = await startSession();
    session.startTransaction();

    const duplicate = await Project.findOne({ "user": user, "repo": repo }).session(
      session
    );
    if (duplicate && duplicate._id.toString() !== _id.toString()) {
      await session.abortTransaction();
      session.endSession();
      return {
        status: 409,
        result: `Repository ${repo} of user ${user} already exists as project`
      };
    }

    const updated = await Project.findByIdAndUpdate(
      _id,
      { user, repo, readme },
      { session }
    );
    if (!updated) {
      throw new Error();
    }

    await session.commitTransaction();
    session.endSession();

    return { status: 200, result: "Project updated" };
  } catch (err) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    return { error: err };
  }
}

async function deleteProject(id) {
  try {
    const result = await Project.findByIdAndDelete(id).lean();
    if (!result) {
      return { status: 404, result: "Project not found" };
    }
    return { status: 200, result: "Project deleted" };
  } catch (err) {
    return { error: err };
  }
}

async function addFile(projectId, name, path, language, startLine, endLine, description) {
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return { status: 404, result: "Project not found" };
    }
    if (project?.files?.some((file) => file?.name === name)) {
      return { status: 409, result: "Filename already exists in this project" };
    }
    const file = { "name": name, "path": path, "language": language };
    if (startLine) file.startLine = startLine;
    if (endLine) file.endLine = endLine;
    if (description) file.description = description;
    project.files.push(file);
    await project.save();
    return { status: 200, result: "File added" };
  } catch (err) {
    return { error: err };
  }
}

async function updateFile(
  projectId,
  fileId,
  name,
  path,
  language,
  startLine,
  endLine,
  description
) {
  try {
    const project = await Project.findById(projectId);
    if (!project?.files?.find((file) => file._id.toString() === fileId)) {
      return { status: 404, result: "File not found" };
    }
    if (
      name &&
      project?.files?.some(
        (file) => file?.name === name && file?._id.toString() !== fileId
      )
    ) {
      return { status: 409, result: "Filename already exists in this project" };
    }

    const updateData = {};
    if (name) updateData["files.$.name"] = name;
    if (path) updateData["files.$.path"] = path;
    if (language) updateData["files.$.language"] = language;
    if (startLine) updateData["files.$.startLine"] = startLine;
    if (endLine) updateData["files.$.endLine"] = endLine;
    if (description) updateData["files.$.description"] = description;

    const result = await Project.findOneAndUpdate(
      { _id: projectId, "files._id": fileId },
      { $set: updateData }
    );
    if (!result) {
      throw new Error();
    }
    return { status: 200, result: "File updated" };
  } catch (err) {
    return { error: err };
  }
}

async function deleteFile(projectId, fileId) {
  try {
    const project = await Project.findById(projectId);
    if (!project?.files?.find((file) => file._id.toString() === fileId)) {
      return { status: 404, result: "Not Found" };
    }
    project.files = project.files.filter((file) => file._id.toString() !== fileId);
    await project.save();
    return { status: 200, result: "File deleted" };
  } catch (err) {
    return { error: err };
  }
}

module.exports = {
  readAllProjects,
  readProjectById,
  createProjectSession,
  updateProjectSession,
  deleteProject,
  addFile,
  updateFile,
  deleteFile
};

const usersService = require("../service/usersService");
const { logError } = require("../middleware/logger");
const { usernameRegex, passwordRegex } = require("../model/regex");
const { isValidObjectId } = require("mongoose");

//GET /api_priv/users
async function readUserData(req, res) {
  try {
    const userid = req.userid;
    if (!isValidObjectId(userid)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const dbQuery = await usersService.readUser(userid);
    if (!dbQuery?.result || dbQuery.error || !dbQuery.status) {
      throw new Error(dbQuery.error ?? "Failed to read user data");
    } else if (dbQuery.status === 200) {
      return res.status(dbQuery.status).json({ data: dbQuery.result });
    }
    return res.status(dbQuery.status).json({ message: dbQuery.result });
  } catch (err) {
    logError(err, req);
    return res.status(400).json({ message: "Failed to read user data" });
  }
}

//POST /api_priv/users
async function createUser(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
      return res.status(400).json({ message: "Invalid user data" });
    }
    const dbSession = await usersService.createUserSession(username, password);
    if (!dbSession?.result || dbSession.error || !dbSession.status) {
      throw new Error(dbSession?.error ?? "");
    }
    return res.status(dbSession.status).json({ message: dbSession.result });
  } catch (err) {
    logError(err, req);
    return res.status(400).json({ message: "Failed to create new user" });
  }
}

//PATCH /api_priv/users
async function updateUser(req, res) {
  try {
    const { newUsername, newPassword } = req.body;
    const userid = req.userid;
    if (!newUsername && !newPassword) {
      return res.status(400).json({ message: "Nothing to change" });
    }
    if (
      !isValidObjectId(userid) ||
      (newUsername && !usernameRegex.test(newUsername)) ||
      (newPassword && !passwordRegex.test(newPassword))
    ) {
      return res.status(400).json({ message: "Invalid user data" });
    }
    const dbSession = await usersService.updateUserSession(
      userid,
      newUsername,
      newPassword
    );
    if (!dbSession?.result || dbSession.error || !dbSession.status) {
      throw new Error(dbSession?.error ?? "");
    }
    return res.status(dbSession.status).json({ message: dbSession.result });
  } catch (err) {
    logError(err, req);
    return res.status(400).json({ message: "Failed to update user" });
  }
}

//DELETE /api_priv/users
async function deleteUser(req, res) {
  try {
    const userid = req.userid;
    if (!isValidObjectId(userid)) {
      throw new Error("Invalid user ID at delete");
    }
    const deletedUser = await usersService.deleteUser(userid);
    if (!deletedUser?.result || deletedUser.error || !deletedUser.status) {
      throw new Error(deletedUser.error ?? "Failed to delete user");
    }
    return res.status(deletedUser.status).json({ message: deletedUser.result });
  } catch (err) {
    logError(err, req);
    return res.status(400).json({ message: "Failed to delete user" });
  }
}

module.exports = { readUserData, createUser, updateUser, deleteUser };

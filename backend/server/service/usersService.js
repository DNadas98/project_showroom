const User = require("../model/User");
const { startSession } = require("mongoose");
const bcrypt = require("bcrypt");

async function readUser(id) {
  try {
    const user = await User.findById(id)
      .select("-_id -password -refreshTokens -active -__v")
      .lean();
    if (user) {
      return { status: 200, result: user };
    }
    return { status: 404, result: "User not found" };
  } catch (err) {
    return { error: err };
  }
}

async function createUserSession(username, password) {
  let session;
  try {
    session = await startSession();
    session.startTransaction();

    const duplicate = await User.findOne({ username }).session(session);
    if (duplicate) {
      await session.abortTransaction();
      session.endSession();
      return { status: 409, result: `Username ${username} already exists` };
    }
    const hashedPwd = await bcrypt.hash(password, 10); //10 salt rounds
    const userObject = { "username": username, "password": hashedPwd, "roles": ["User"] };
    const createdUser = await User.create([userObject], { session });

    if (createdUser) {
      await session.commitTransaction();
      session.endSession();
      return {
        status: 201,
        result: `New user ${username} created successfully`
      };
    }
    await session.abortTransaction();
    session.endSession();
    return { status: 400, result: "Failed to create new user" };
  } catch (err) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    return { error: err };
  }
}

async function updateUserSession(userid, newUsername, newPassword) {
  let session;
  try {
    session = await startSession();
    session.startTransaction();

    const user = await User.findById(userid).session(session);
    if (newUsername) {
      const duplicate = await User.findOne({ username: newUsername }).session(session);
      if (duplicate && duplicate?._id.toString() !== userid) {
        await session.abortTransaction();
        session.endSession();
        return {
          status: 409,
          result: `Username ${newUsername} already exists`
        };
      }
      user.username = newUsername;
    }
    if (newPassword) {
      user.password = await bcrypt.hash(newPassword, 10);
    }
    const updatedUser = await user.save({ session });

    if (updatedUser) {
      await session.commitTransaction();
      session.endSession();
      return {
        status: 200,
        result: `${updatedUser.username} updated successfully`
      };
    }
    await session.abortTransaction();
    session.endSession();
    return {
      status: 400,
      result: "Failed to update user"
    };
  } catch (err) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    return { error: err };
  }
}

async function deleteUser(id) {
  try {
    const user = await User.findByIdAndDelete(id);
    if (user) {
      return { status: 200, result: "User deleted successfully" };
    }
    return { status: 404, result: "User not found" };
  } catch (err) {
    return { error: err };
  }
}

module.exports = { readUser, createUserSession, updateUserSession, deleteUser };

const { startSession } = require("mongoose");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function signAccessToken(userid, roles) {
  return jwt.sign(
    {
      "UserInfo": { "userid": userid, "roles": roles }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: `${process.env.ACCESS_TOKEN_EXPIRESIN}`, algorithm: "HS256" }
  );
}

function verifyAccessToken(accessToken) {
  return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, {
    algorithms: ["HS256"]
  });
}

function signRefreshToken(userid, roles) {
  return jwt.sign(
    { "UserInfo": { "userid": userid, "roles": roles } },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: `${process.env.REFRESH_TOKEN_EXPIRESIN}`, algorithm: "HS256" }
  );
}

function verifyRefreshToken(refreshToken) {
  return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, {
    algorithms: ["HS256"]
  });
}

async function loginSession(username, password, oldRefreshToken, adminOnly = true) {
  let session;
  try {
    session = await startSession();
    session.startTransaction();
    const foundUser = await User.findOne({ username }).session(session);
    if (!foundUser) {
      await session.abortTransaction();
      session.endSession();
      return { status: 401, message: "Wrong username or password" };
    }
    if (!foundUser.active || (adminOnly && !foundUser.roles?.includes("Admin"))) {
      await session.abortTransaction();
      session.endSession();
      return {
        status: 401,
        message: "You do not have the necessary privileges to view this content"
      };
    }
    const pwdMatching = await bcrypt.compare(password, foundUser.password);
    if (!pwdMatching) {
      await session.abortTransaction();
      session.endSession();
      return { status: 401, message: "Wrong username or password" };
    }

    if (oldRefreshToken && foundUser.refreshTokens.length > 0) {
      let isValid = false;
      for (let i = 0; i < foundUser.refreshTokens.length; i++) {
        const matching = await bcrypt.compare(
          oldRefreshToken,
          foundUser.refreshTokens[i]
        );
        if (matching) {
          isValid = true;
          foundUser.refreshTokens.splice(i, 1);
          break;
        }
      }
      if (!isValid) {
        //detected an already invalidated refresh token --> invalidate all tokens
        foundUser.refreshTokens = [];
        await foundUser.save({ session });
        await session.commitTransaction();
        session.endSession();
        return { status: 401, message: "Unauthorized", clearCookie: true };
      }
    }
    const newRefreshToken = signRefreshToken(foundUser._id, foundUser.roles);
    const hashedNewRefreshToken = await bcrypt.hash(newRefreshToken, 10);
    foundUser.refreshTokens.push(hashedNewRefreshToken);
    await foundUser.save({ session });
    await session.commitTransaction();
    session.endSession();
    return {
      status: 200,
      result: {
        "_id": foundUser._id,
        "username": foundUser.username,
        "roles": foundUser.roles,
        "newRefreshToken": newRefreshToken
      }
    };
  } catch (err) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    return { error: err };
  }
}

async function refreshSession(refreshToken, userid, roles, adminOnly) {
  let session;
  try {
    session = await startSession();
    session.startTransaction();
    const foundUser = await User.findOne({ _id: userid, roles }).session(session);
    if (adminOnly && !foundUser.roles?.includes("Admin")) {
      await session.abortTransaction();
      session.endSession();
      return {
        status: 401,
        message: "You do not have the necessary privileges to view this content"
      };
    }
    if (!foundUser || !foundUser.active || !foundUser?.refreshTokens?.length >= 1) {
      await session.abortTransaction();
      session.endSession();
      return { status: 401, result: "Unauthorized" };
    }
    let isValid = false;
    for (let i = 0; i < foundUser.refreshTokens.length; i++) {
      const matching = await bcrypt.compare(refreshToken, foundUser.refreshTokens[i]);
      if (matching) {
        isValid = true;
        break;
      }
    }
    if (!isValid) {
      foundUser.refreshTokens = [];
      await foundUser.save({ session });
      await session.commitTransaction();
      session.endSession();
      return { status: 401, result: "Unauthorized", clearCookie: true };
    }
    await session.commitTransaction();
    session.endSession();
    return {
      status: 200,
      result: {
        "_id": foundUser._id,
        "username": foundUser.username,
        "roles": foundUser.roles
      }
    };
  } catch (err) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    return { error: err };
  }
}

async function logoutSession(userid, refreshToken) {
  let session;
  try {
    session = await startSession();
    session.startTransaction();
    const foundUser = await User.findById(userid).session(session);
    if (foundUser) {
      let isValid = false;
      for (let i = 0; i < foundUser.refreshTokens.length; i++) {
        const matching = await bcrypt.compare(refreshToken, foundUser.refreshTokens[i]);
        if (matching) {
          foundUser.refreshTokens.splice(i, 1);
          isValid = true;
          break;
        }
      }
      if (!isValid) {
        foundUser.refreshTokens = [];
      }
      await foundUser.save({ session });
      await session.commitTransaction();
      session.endSession();
    } else {
      throw new Error("Not found");
    }
    return { result: true };
  } catch (err) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    return { error: err };
  }
}

module.exports = {
  loginSession,
  refreshSession,
  logoutSession,
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken
};

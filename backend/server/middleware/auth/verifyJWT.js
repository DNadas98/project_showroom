const { logError } = require("../logger");
const { isValidObjectId } = require("mongoose");
const authService = require("../../service/authService");

function isValidUserInfo(userInfo) {
  return (
    userInfo &&
    userInfo.userid &&
    isValidObjectId(userInfo.userid) &&
    userInfo.roles &&
    Array.isArray(userInfo.roles)
  );
}

function verifyJWT(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const accessToken = authHeader?.split(" ")[1];
    const refreshToken = req?.cookies?.jwt;

    if (!authHeader?.startsWith("Bearer") || !accessToken || !refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const accessDecoded = authService.verifyAccessToken(accessToken);
    const refreshDecoded = authService.verifyRefreshToken(refreshToken);

    if (
      !isValidUserInfo(accessDecoded.UserInfo) ||
      !isValidUserInfo(refreshDecoded.UserInfo) ||
      accessDecoded.UserInfo.userid !== refreshDecoded.UserInfo.userid ||
      JSON.stringify(accessDecoded.UserInfo.roles) !==
        JSON.stringify(refreshDecoded.UserInfo.roles)
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.userid = accessDecoded.UserInfo.userid;
    req.roles = accessDecoded.UserInfo.roles;
    req.refreshToken = refreshToken;
    return next();
  } catch (err) {
    logError(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = verifyJWT;

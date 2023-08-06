const { logError } = require("../middleware/logger");
const { isValidObjectId } = require("mongoose");
const { usernameRegex, passwordRegex } = require("../model/regex");
const authService = require("../service/authService");

//
const adminOnly = true;
//

//GET /api_priv/auth/login
async function login(req, res) {
  try {
    const { username, password } = req.body;
    const oldRefreshToken = req?.cookies?.jwt;
    if (!username || !password || typeof password !== "string") {
      return res.status(400).json({ message: "Missing username or password" });
    }
    if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
      return res.status(400).json({ message: "Invalid user data" });
    }
    const dbSession = await authService.loginSession(
      username,
      password,
      oldRefreshToken,
      adminOnly
    );
    if (!dbSession || dbSession.error) {
      throw new Error(dbSession?.error ?? "DB error at login");
    }
    if (
      dbSession?.result?._id &&
      dbSession?.result?.username &&
      dbSession?.result?.roles &&
      dbSession?.result?.newRefreshToken
    ) {
      const accessToken = authService.signAccessToken(
        dbSession.result._id,
        dbSession.result.roles
      );
      res.cookie("jwt", dbSession.result.newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: process.env.REFRESH_TOKEN_EXPIRESIN
      });
      return res.status(200).json({
        "accessToken": accessToken,
        "username": dbSession.result.username,
        "roles": dbSession.result.roles
      });
    }
    if (dbSession?.clearCookie) {
      res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    }
    return res
      .status(dbSession?.status ?? 401)
      .json({ message: dbSession?.message ?? "Unauthorized" });
  } catch (err) {
    logError(err, req);
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.status(401).json({ message: "Unauthorized" });
  }
}

//GET /api_priv/auth/refresh
async function refresh(req, res) {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });
    const refreshToken = cookies.jwt;
    const decoded = authService.verifyRefreshToken(refreshToken);
    const userid = decoded?.UserInfo?.userid;
    const roles = decoded?.UserInfo?.roles;
    if (!userid || !roles) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!isValidObjectId(userid) || !Array.isArray(roles)) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const dbSession = await authService.refreshSession(
      refreshToken,
      userid,
      roles,
      adminOnly
    );
    if (!dbSession || dbSession.error) {
      throw new Error(dbSession?.error ?? "DB error at login");
    }
    if (
      dbSession?.result?._id &&
      dbSession?.result?.username &&
      dbSession?.result?.roles
    ) {
      const accessToken = authService.signAccessToken(
        dbSession.result._id,
        dbSession.result.roles
      );

      return res.status(200).json({
        "accessToken": accessToken,
        "username": dbSession.result.username,
        "roles": dbSession.result.roles
      });
    }
    if (dbSession?.clearCookie) {
      res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    }
    return res
      .status(dbSession?.status ?? 401)
      .json({ message: dbSession?.message ?? "Unauthorized" });
  } catch (err) {
    logError(err, req);
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.status(401).json({ message: "Unauthorized" });
  }
}

//GET /api_priv/auth/logout
async function logout(req, res) {
  try {
    const cookies = req.cookies;
    const refreshToken = cookies?.jwt;
    if (!refreshToken) {
      return res.status(204).json({ message: "No content" });
    }
    const decoded = authService.verifyRefreshToken(refreshToken);
    const userid = decoded?.UserInfo?.userid;
    if (!isValidObjectId(userid)) {
      throw new Error("Invalid user ID at logout");
    } else {
      const dbSession = await authService.logoutSession(userid, refreshToken);
      if (dbSession?.error) {
        throw new Error(dbSession.error);
      }
    }
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    logError(err, req);
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.status(400).json({ message: "Invalid request" });
  }
}

//GET /auth/validate
function validateAccess(req, res) {
  return res.status(200).json({ message: "OK" });
}

module.exports = { login, refresh, logout, validateAccess };

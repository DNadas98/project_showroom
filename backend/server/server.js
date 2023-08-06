const https = require("https");
const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/dbConnection");
const { logRequest, logServed, logError } = require("./middleware/logger");
const authRouter = require("./routes/auth/authRouter.js");
const usersRouter = require("./routes/auth/usersRouter.js");
const adminRouter = require("./routes/auth/adminRouter.js");
const projectsRouter = require("./routes/projectsRouter.js");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsConfig");
const mongoose = require("mongoose");

//only for dev
require("dotenv").config({ path: path.join(__dirname, "../../env/backend.env.dev") });

const server = express();

server.use(cors(corsOptions));

//Built-in middleware to handle form data, JSON and static files
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser());

//Request logger middleware
server.use(logRequest);

//Routing
server.use("/api_priv/auth", authRouter);
server.use("/api_priv/users", usersRouter);
server.use("/api_priv/admin", adminRouter);
server.use("/api/projects", projectsRouter);

//test server error route
// eslint-disable-next-line no-unused-vars
server.get("/error", (req, res, next) => {
  throw new Error("");
});

//404 - Not Found
server.use((req, res, next) => {
  try {
    if (req.accepts("application/json")) {
      res.status(404);
      logServed(req, res);
      return res.json({ message: "Not Found" });
    }
    res.status(404);
    logServed(req, res);
    return res.send("Not Found");
  } catch (err) {
    logError(err, req);
    return next(err);
  }
});

//500 - Internal Server Error
// eslint-disable-next-line no-unused-vars
server.use((err, req, res, next) => {
  if (req.accepts("application/json")) {
    res.status(500);
    logError(err, req);
    return res.json({ message: "Internal Server Error" });
  }
  res.status(500);
  logError(err, req);
  return res.send("Internal Server Error");
});

//Connect to db, start server
async function start() {
  try {
    await dbConnection();
    console.log("Connected to database");
    const options = {
      key: fs.readFileSync(path.join(__dirname, `../../ssl/${process.env.SSL_KEY_PATH}`)),
      cert: fs.readFileSync(
        path.join(__dirname, `../../ssl/${process.env.SSL_CERT_PATH}`)
      )
    };
    https.createServer(options, server).listen(process.env.PORT, () => {
      console.log(`HTTPS Server running on port ${process.env.PORT}`);
    });
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}
start();

//handle DB errors
mongoose.connection.on("error", (err) => {
  logError(err);
});

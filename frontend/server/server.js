const https = require("https");
const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const corsConfig = require("./config/corsConfig");
const { logRequest, logServed, logError } = require("./middleware/logger");

//only for dev
require("dotenv").config({ path: path.join(__dirname, "../../env/frontend.env.dev") });

const server = express();

//CORS
server.use(cors(corsConfig));

//Built-in middleware to handle form data, JSON and static files
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

//Request logger middleware
server.use(logRequest);

//serve build
server.use("/static", express.static(path.join(__dirname, "view/static")));
server.get("/*", (req, res, next) => {
  try {
    if (fs.existsSync(path.join(__dirname, "view/index.html"))) {
      res.status(200);
      logServed(req, res);
      return res.sendFile(path.join(__dirname, "view/index.html"));
    }
    return next();
  } catch (err) {
    return next(err);
  }
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
function start() {
  try {
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

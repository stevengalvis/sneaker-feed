const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

mongoose.Promise = global.Promise;
const { router: userRouter } = require("./user-router");

const { CLIENT_ORIGIN, PORT, DATABASE_URL } = require("./config");

const app = express();

app.use(express.static("public"));
app.use(morgan("common"));

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use("/users", userRouter);

app.use("*", function(req, res) {
  return res.status(404).json({ message: "Not found" });
});

let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, { useMongoClient: true }, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(PORT, () => {
          console.log(`Your app is listening on ${PORT}`);
          resolve();
        })
        .on("error", err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing server");
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };

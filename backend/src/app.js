const express = require("express");
const logger = require("morgan");

const summonerRouter = require("./resources/summoner/router");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Method", "GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, X-Requested-With, Content-Type",
  );
  next();
});
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/summoner", summonerRouter);

module.exports = app;

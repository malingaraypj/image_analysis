const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");

dotenv.config({
  path: "./config.env",
});

const DB = process.env.LOCAL_DB;

mongoose
  .connect(DB)
  .then(() => {
    console.log("connection to database is successful");
  })
  .catch((err) => {
    console.log("error while connection to database: \n", err);
  });

app.listen(4000, (err) => {
  if (err) {
    console.log("error while connecting to server.");
    return;
  }
  console.log("server connected successfully");
});

const express = require("express");
const infoCardsRouter = require("./Routers/infoCardsRouter");
const userRouter = require("./Routers/userRouter");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // Allow only this origin
    methods: ["GET", "POST"], // Allow only these methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use("/medical_analysis/infoCards", infoCardsRouter);
app.use("/medical_analysis/user", userRouter);

module.exports = app;

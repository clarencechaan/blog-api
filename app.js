const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

const indexRouter = require("./routes/index");

const app = express();

//Set up mongoose connection
const mongoose = require("mongoose");
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

module.exports = app;

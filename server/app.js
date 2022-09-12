if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const app = express();
const path = require('path')
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

app.use(router);
app.use(errorHandler);

module.exports = app;

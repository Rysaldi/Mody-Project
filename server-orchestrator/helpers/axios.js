const axios = require("axios");

const app = axios.create({
  baseURL: "http://localhost:3000",
});

module.exports = { app };

const axios = require("axios");

const user = axios.create({
  baseURL: "http://localhost:4001",
});

module.exports = { user };

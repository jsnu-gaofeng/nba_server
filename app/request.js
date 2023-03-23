const axios = require("axios");
const request = axios.create({
  baseURL: "",
  timeout: 5000,
});
module.exports = request;

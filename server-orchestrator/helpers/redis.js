require("dotenv").config();
const Redis = require("ioredis");
const redis = new Redis({
  port: 11516, // Redis port
  host: "redis-11516.c98.us-east-1-4.ec2.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: process.env.REDIS_PW,
  db: 0, // Defaults to 0
});

module.exports = redis;

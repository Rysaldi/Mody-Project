"use strict";
const userData = require("../data/user.json");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

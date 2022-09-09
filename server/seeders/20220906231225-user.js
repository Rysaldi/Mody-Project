"use strict";
const userData = require("../data/user.json");
const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = userData.map((user) => {
      user.password = hashPassword(user.password);
      user.createdAt = user.updatedAt = new Date();
      return user;
    });
    await queryInterface.bulkInsert("Users", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

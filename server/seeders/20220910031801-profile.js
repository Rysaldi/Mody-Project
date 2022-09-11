'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const profiles = require("../data/profile.json");
		profiles.forEach((profile) => {
			delete profile.id;
			profile.createdAt = profile.updatedAt = new Date();
		});
		await queryInterface.bulkInsert("Profiles", profiles);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Profiles");
  }
};

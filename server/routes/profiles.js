const profiles = require("express").Router();
const ProfileController = require("../controllers/profile");

profiles.get('/', ProfileController.getOneProfile)
profiles.put('/update', ProfileController.updateProfile)

module.exports = profiles


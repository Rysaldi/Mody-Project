const profiles = require("express").Router();
const ProfileController = require("../controllers/profile");

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer ({ storage });
const imageUpload = require('../middlewares/imageUpload')

profiles.get('/', ProfileController.getOneProfile)
profiles.put('/update', upload.single('profilePicture'), imageUpload, ProfileController.updateProfile)

module.exports = profiles


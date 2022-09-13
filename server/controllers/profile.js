const { Profile } = require("../models");

class ProfileController {
	static async getOneProfile(req, res, next) {
		try {
			const oneProfile = await Profile.findOne({
				where: {
					UserId: req.user.id,
				},
			});
			if (oneProfile) {
				res.status(200).json(oneProfile);
			}
		} catch (error) {
			next(error);
		}
	}

	static async updateProfile(req, res, next) {
		try {
			const { firstName, lastName, phone } = req.body;
			console.log(req.body)
			const updateProfile = await Profile.update(
				{
					firstName,
					lastName,
					profilePicture: req.profilePicture,
					phone,
				},
				{
					where: {
						UserId: req.user.id,
					},
				}
			);
			if (updateProfile) res.status(200).json({ message: "update profile success" });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = ProfileController;

const { User } = require("../models");
class userController {
  static async register(request, response, next) {
    try {
      const { username, email, password } = request.body;
      const payload = {
        username,
        email,
        password,
      };
      const createUser = await User.create(payload);
      response.status(201).json({
        message: "Success create user",
        user: createUser,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(request, response, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userController;

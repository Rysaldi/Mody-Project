const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
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
      try {
        const { email, password } = request.body;
        // validation user input
        if (!email || !password) {
          throw { name: "Invalid input" };
        }
        const user = await User.findOne({
          where: {
            email,
          },
        });
        // check if user exist
        console.log(user);
        if (user) {
          const isPasswordValid = comparePassword(password, user.password);
          // check if password valid
          if (!isPasswordValid) {
            throw { name: "invalid email/password" };
          }
          // create payload and assign user id
          const payload = {
            id: user.id,
          };
          const access_token = createToken(payload);
          response.status(200).json({
            access_token,
          });
        } else {
          throw { name: "invalid email/password" };
        }
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userController;

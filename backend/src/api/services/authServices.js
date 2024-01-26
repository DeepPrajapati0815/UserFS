const { encryptPassword, verifyPassword } = require("../../helpers/password");
const models = require("../models");
const Errors = require("../../errors");
const { signJWT } = require("../../helpers/common");

class AuthService {
  async register({ username, password }) {
    console.log(
      "🚀 ~ file: authServices.js:10 ~ AuthService ~ register ~ register: Service Entry"
    );

    try {
      const user = await models.User.findOne({
        where: { username },
      });

      if (user) {
        throw Errors.UnauthorizedError("User already registered");
      }

      const hasedPwd = await encryptPassword(password);

      await models.User.create({
        username: username,
        password: hasedPwd,
      });

      return {
        statusCode: 200,
        status: true,
        message: "Signup Successfully",
        data: null,
      };
    } catch (error) {
      console.log(error);
      throw new Errors(error.statusCode || 500, error.message);
    }
  }

  async login(payload) {
    console.log(
      "🚀 ~ file: authServices.js:10 ~ AuthService ~ logIn ~ logIn: Service Entry"
    );

    try {
      const user = await models.User.findOne({
        where: { username: payload.username },
        attributes: { include: ["password"] },
      });

      if (!user) {
        throw Errors.UnauthorizedError("User not registered");
      }

      const isPasswordValid = await verifyPassword(
        payload.password,
        user.password
      );

      if (!isPasswordValid) {
        throw Errors.UnauthorizedError("Invalid Password");
      }

      const token = signJWT({
        userId: user.id,
        username: user.username,
      });

      await user.update({
        token: token,
      });

      return {
        statusCode: 200,
        status: true,
        message: "Login Successfully",
        data: {
          id: user.id,
          username: user.username,
          token,
        },
      };
    } catch (error) {
      console.log(error);
      throw new Errors(error.statusCode || 500, error.message);
    }
  }

  async logout(payload) {
    console.log(
      "🚀 ~ file: authServices.js:10 ~ AuthService ~ logout ~ logout: Service Entry"
    );

    try {
      const userExist = await models.User.findOne({
        where: {
          id: payload.id,
        },
      });

      if (userExist != null) {
        await userExist.update({
          token: null,
        });

        return {
          statusCode: 200,
          status: true,
          message: "Logout Successfully",
          data: null,
        };
      } else {
        throw Errors.notFoundError("User not registered");
      }
    } catch (error) {
      console.log(error);
      throw new Errors(error.statusCode || 500, error.message);
    }
  }
}

module.exports = new AuthService();

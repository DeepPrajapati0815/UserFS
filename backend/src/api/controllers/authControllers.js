const Errors = require("../../errors");
const AuthService = require("../services/authServices");

exports.register = async (req, res, next) => {
  console.log(
    "🚀 ~ file: authControllers.js:6 ~ exports.register= ~ register Controller Entry"
  );

  try {
    const payload = {
      username: req.body.username,
      password: req.body.password,
    };

    const response = await AuthService.register(payload);

    if (response.status) {
      const isDevelopment = process.env.NODE_ENV === "development";
      res.cookie(process.env.AUTH_COOKIE_NAME, response.token, {
        httpOnly: true,
        sameSite: isDevelopment ? true : "none",
        secure: !isDevelopment,
      });
    }

    req.rData = response.data;
    req.rCode = response.statusCode;
    req.rStatus = response.status;
    req.msg = response.message;

    next();
  } catch (error) {
    throw new Errors(error.statusCode, error.message);
  }
};

exports.login = async (req, res, next) => {
  console.log(
    "🚀 ~ file: authControllers.js:6 ~ exports.logIn= ~ logIn Controller Entry"
  );

  try {
    const payload = {
      username: req.body.username,
      password: req.body.password,
    };

    const response = await AuthService.login(payload);

    if (response.status) {
      const isDevelopment = process.env.NODE_ENV === "development";
      res.cookie(process.env.AUTH_COOKIE_NAME, response.token, {
        httpOnly: true,
        sameSite: isDevelopment ? true : "none",
        secure: !isDevelopment,
      });
    }

    req.rData = response.data;
    req.rCode = response.statusCode;
    req.rStatus = response.status;
    req.msg = response.message;

    next();
  } catch (error) {
    throw new Errors(error.statusCode, error.message);
  }
};

exports.logout = async (req, res, next) => {
  console.log(
    "🚀 ~ file: authControllers.js:46 ~ exports.logout= ~ logout: controller Entry"
  );

  try {
    const payload = {
      id: res.locals.userId,
    };

    const response = await AuthService.logout(payload);

    req.rData = response.data;
    req.msg = response.message;
    req.rStatus = response.status;
    req.rCode = response.status ? 200 : 400;

    next();
  } catch (error) {
    throw new Errors(error.statusCode, error.message);
  }
};

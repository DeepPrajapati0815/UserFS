require("dotenv").config({ path: "../../.env" });
const jwt = require("jsonwebtoken");
const models = require("../api/models");

exports.authUserToken = (req, res, next) => {
  let token = req.get("authorization");
  if (!token) {
    return res.status(403).json({
      message: "Access Denied!",
      status: false,
      data: null,
    });
  } else {
    const tk = token.split(" ");

    jwt.verify(tk[1], process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(403).json({
            message: "Token has expired",
            status: false,
            data: null,
          });
        } else {
          return res.status(403).json({
            message: "Invalid Token",
            status: false,
            data: null,
          });
        }
      } else {
        await models.User.findOne({
          attributes: ["token"],
          where: {
            id: decode.userId,
          },
        })
          .then((user) => {
            if (!user) {
              return res.status(403).json({
                message: "No user found!",
                status: false,
                data: null,
              });
            }
            if (user.token && user.token == tk[1]) {
              res.locals.token = tk[1];
              res.locals.username = decode.username;
              res.locals.userId = decode.userId;
              next();
            } else {
              return res.status(403).json({
                message: "Invalid Token, Sign in again",
                status: false,
                data: null,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            return res.status(403).json({
              message: "Something went wrong!",
              status: false,
              data: null,
            });
          });
      }
    });
  }
};

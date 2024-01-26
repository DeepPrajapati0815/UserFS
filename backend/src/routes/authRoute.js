const express = require("express");
const router = express.Router();
const auth = require("../api/controllers/authControllers");
const verifyToken = require("../middlewares/verifyToken");
const ErrorHandlerMiddleware = require("../middlewares/ErrorHandlerMiddleware");
const ResponseMiddleware = require("../middlewares/ResponseMiddleware");

router.post(
  "/register",
  ErrorHandlerMiddleware(auth.register),
  ResponseMiddleware
);

router.post("/login", ErrorHandlerMiddleware(auth.login), ResponseMiddleware);

router.get(
  "/logout",
  verifyToken.authUserToken,
  ErrorHandlerMiddleware(auth.logout),
  ResponseMiddleware
);

module.exports = router;

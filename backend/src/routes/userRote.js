const express = require("express");
const router = express.Router();
const userController = require("../api/controllers/userControllers");
const verifyToken = require("../middlewares/verifyToken");

const ErrorHandlerMiddleware = require("../middlewares/ErrorHandlerMiddleware");
const ResponseMiddleware = require("../middlewares/ResponseMiddleware");
const upload = require("../middlewares/fileUpload");

router.post(
  "/file",
  verifyToken.authUserToken,
  upload.single("file"),
  ErrorHandlerMiddleware(userController.uploadFile),
  ResponseMiddleware
);

router.get(
  "/file",
  verifyToken.authUserToken,
  ErrorHandlerMiddleware(userController.getAll),
  ResponseMiddleware
);

router.delete(
  "/file/:id",
  verifyToken.authUserToken,
  ErrorHandlerMiddleware(userController.deleteFileById),
  ResponseMiddleware
);

router.post(
  "/file/code/:id",
  verifyToken.authUserToken,
  ErrorHandlerMiddleware(userController.getFileCode),
  ResponseMiddleware
);

router.post(
  "/file/download/:id",
  verifyToken.authUserToken,
  userController.downloadFile
);

module.exports = router;

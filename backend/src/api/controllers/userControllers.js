const UserService = require("../services/userServices");
const Errors = require("../../errors");

exports.uploadFile = async (req, res, next) => {
  console.log(
    "🚀  ~ file: customerController.js:6 ~ exports.createOrUpdateCustomer= ~ createOrUpdateCustomer:"
  );

  const file = req.file;

  try {
    if (!file) {
      throw Errors.invalidRequestError("File is required");
    }

    const payload = {
      userId: res.locals.userId,
      file: file.filename,
    };

    const response = await UserService.upload(payload);

    req.rData = response.data;
    req.msg = response.message;
    req.rStatus = response.status;
    req.rCode = response.statusCode ? 200 : 400;

    next();
  } catch (error) {
    throw new Errors(error.statusCode, error.message);
  }
};

exports.getAll = async (req, res, next) => {
  console.log(
    "🚀  ~ file: categoriesControllers.js:33 ~ exports.getAll= ~ getAll:"
  );

  try {
    const payload = {
      userId: res.locals.userId,
    };

    if (!payload.userId) {
      throw Errors.UnauthorizedError("User not logged in");
    }

    const response = await UserService.getAll(payload);

    req.rData = response.data;
    req.msg = response.message;
    req.rStatus = response.status;

    next();
  } catch (error) {
    throw new Errors(error.statusCode, error.message);
  }
};

exports.deleteFileById = async (req, res, next) => {
  console.log(
    "🚀  ~ file: categoriesControllers.js:71 ~ exports.deleteById ~ deleteById:"
  );

  try {
    const fileId = req.params.id;

    if (!fileId) {
      throw new Errors(400, "file id is required");
    }

    const response = await UserService.deleteFileById(fileId);

    req.rData = response.data;
    req.msg = response.message;
    req.rStatus = response.status;

    next();
  } catch (error) {
    throw new Errors(error.statusCode, error.message);
  }
};

exports.getFileCode = async (req, res, next) => {
  try {
    const fileId = req.params.id;

    if (!fileId) {
      throw new Errors(400, "file id is required");
    }

    const payload = {
      id: fileId,
      userId: res.locals.userId,
      password: req.body.password,
    };

    const response = await UserService.getFileCode(payload);

    req.rData = response.data;
    req.msg = response.message;
    req.rStatus = response.status;

    next();
  } catch (error) {
    throw new Errors(error.statusCode, error.message);
  }
};

exports.downloadFile = async (req, res) => {
  console.log(
    "🚀  ~ file: categoriesControllers.js:71 ~ exports.deleteById ~ deleteById:"
  );

  try {
    const fileId = req.params.id;

    const payload = {
      id: fileId,
      code: req.body.code,
    };

    if (!fileId) {
      throw new Errors(400, "file id is required");
    }

    if (!payload.code) {
      throw new Errors(400, "file code is required");
    }

    const response = await UserService.downloadFile(payload);

    return res.sendFile(response.data.fileUrl);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

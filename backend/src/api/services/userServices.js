const models = require("../models");
const Errors = require("../../errors");
const fs = require("fs");
const { generateCode } = require("../../helpers/common");
const path = require("path");
const { verifyPassword } = require("../../helpers/password");

const baseURL = process.env.PUBLIC_URL + "/uploads/files/";
const uploadURL = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "public",
  "uploads/files/"
);

class UserService {
  async upload(payload) {
    console.log(
      "🚀  ~ file: UserService.js:13 ~ UserService ~ upload ~ upload:"
    );

    try {
      const user = await models.User.findOne({
        where: {
          id: payload.userId,
        },
      });

      if (!user) {
        throw Errors.forbidden("User not registered");
      } else {
        const code = generateCode();

        const userFile = await models.File.create({
          file: payload.file,
          code: code,
          userId: payload.userId,
        });

        const fileUrl = baseURL + userFile.file;

        return {
          statusCode: 200,
          message: "File uploaded successfully",
          status: true,
          data: {
            fileUrl: fileUrl,
            code: userFile.code,
          },
        };
      }
    } catch (error) {
      console.log(error);
      throw new Errors(error.statusCode || 500, error.message);
    }
  }

  async getAll(payload) {
    console.log(
      "🚀  ~ file: categoriesServices.js:56 ~ CategoriesService ~ getAll ~ getAll:"
    );

    try {
      const files = await models.File.findAll({
        where: {
          userId: payload.userId,
        },
        attributes: [
          "id",
          [
            models.sequelize.fn(
              "CONCAT",
              models.sequelize.literal(`'${baseURL}'`),
              models.Sequelize.col("file")
            ),
            "file",
          ],
        ],
        order: [["createdAt", "DESC"]],
      });

      return {
        statusCode: 200,
        message: "Files fetched successfully",
        status: true,
        data: files,
      };
    } catch (error) {
      console.log(error);
      throw new Errors(error.statusCode || 500, error.message);
    }
  }

  async deleteFileById(id) {
    console.log(
      "🚀  ~ file: UserService.js:92 ~ UserService ~ deleteFileById ~ deleteFileById:"
    );

    try {
      const file = await models.File.findOne({
        where: {
          id: id,
        },
      });

      if (!file) {
        throw Errors.invalidRequestError("file not found");
      }

      const fileurl = uploadURL + "/" + file.file;

      if (fs.existsSync(fileurl)) {
        fs.unlink(fileurl, (err) => {
          if (err) throw err;
        });
      }

      await file.destroy();

      return {
        statusCode: 200,
        message: "file deleted successfully",
        status: true,
        data: null,
      };
    } catch (error) {
      throw new Errors(error.statusCode || 500, error.message);
    }
  }

  async downloadFile(payload) {
    console.log(
      "🚀  ~ file: UserService.js:92 ~ UserService ~ downloadFile ~ downloadFile:"
    );

    try {
      const file = await models.File.findOne({
        where: {
          id: payload.id,
        },
      });

      if (!file) {
        throw Errors.invalidRequestError("file not found");
      }

      if (file.code !== payload.code) {
        throw Errors.invalidRequestError("Invalid code");
      }

      const fileUrl = uploadURL + "/" + file.file;

      if (!fs.existsSync(fileUrl)) {
        throw Errors.invalidRequestError("File does not exist");
      }

      return {
        statusCode: 200,
        message: "file downloaded successfully",
        status: true,
        data: {
          fileUrl: fileUrl,
        },
      };
    } catch (error) {
      throw new Errors(error.statusCode || 500, error.message);
    }
  }

  async getFileCode(payload) {
    try {
      const user = await models.User.findOne({
        where: {
          id: payload.userId,
        },
        attributes: { include: ["password"] },
      });

      if (!user) {
        throw Errors.forbidden("User not registered");
      }

      const isPasswordValid = await verifyPassword(
        payload.password,
        user.password
      );

      if (!isPasswordValid) {
        throw Errors.UnauthorizedError("Invalid Password");
      }

      const userFile = await models.File.findOne({
        where: {
          id: payload.id,
        },
      });

      return {
        statusCode: 200,
        message: "File fetched successfully",
        status: true,
        data: {
          id: userFile.id,
          fileUrl: baseURL + userFile.file,
          code: userFile.code,
        },
      };
    } catch (error) {
      console.log(error);
      throw new Errors(error.statusCode || 500, error.message);
    }
  }
}

module.exports = new UserService();

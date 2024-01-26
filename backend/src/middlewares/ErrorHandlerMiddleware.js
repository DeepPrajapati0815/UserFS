const colors = require("colors");
const current_time = new Date().toString().slice(16, 24);
const models  = require("../api/models");
const ResponseMiddleware = require("./ResponseMiddleware");

module.exports = (handler) => {
  return async (req, res, next) => {
    const transaction = await models.sequelize.transaction();
    try {
      await handler(req, res, next, transaction);
      await transaction.commit();
    } catch (ex) {
      let name = handler.name;

      console.log(
        colors.red(
          ` ## ${current_time} ## Exception in ${name}:  ${ex.message}`
        ),
        ex
      );
      
      await transaction.rollback();
      req.rCode = ex.statusCode || 500;
      let message = ex.statusCode == 500 ? `Internal Server Error`: ex.message;
      req.rStatus = false;
      ResponseMiddleware(req, res, next, message);
    }
  };
};

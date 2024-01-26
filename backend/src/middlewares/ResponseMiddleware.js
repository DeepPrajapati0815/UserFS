const colors = require("colors");
// const messages = require("../util/messages");

module.exports = (req, res, next, customMsg = "") => {
  console.log("ResponseMiddleware => exports");
  const data = req.rData ? req.rData : {};
  const code = req.rCode != undefined ? req.rCode : 200;
  const status = req.rStatus != undefined ? req.rStatus : true;
  const message = req.msg ? req.msg : customMsg;

  console.log(
    colors.bgBlue(
      `${req.method} '${req.originalUrl}' => '${message}', Code: ${code}`
    )
  );

  res.status(code).json({ message,status, data });
};

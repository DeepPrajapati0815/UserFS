const jwt = require("jsonwebtoken");

const generateCode = () => {
  var digits = "1234567890";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

const signJWT = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
  return token;
};

module.exports = {
  signJWT,
  generateCode,
};

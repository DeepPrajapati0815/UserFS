const bcrypt = require("bcryptjs");

const encryptPassword = async (password) => {
  const rounds = process.env.NODE_ENV === "development" ? 1 : 10;
  const salt = await bcrypt.genSalt(rounds);
  return await bcrypt.hash(password, salt);
};

const verifyPassword = async (requestPassword, dbPassword) => {
  if (!requestPassword || !dbPassword) {
    return false;
  }
  return await bcrypt.compare(requestPassword, dbPassword);
};

module.exports = { encryptPassword, verifyPassword };

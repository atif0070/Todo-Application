const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "secretKey", { expiresIn: "24h" });
};

module.exports = generateToken;

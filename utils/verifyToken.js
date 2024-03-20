const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return jwt.verify( token , "secretKey", (err, decodedUser) => {
    if (err) {
      return {
        status: "Failed in verifytoken",
      };
    } else {
      return decodedUser;
    }
  });
};

module.exports = verifyToken;

const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

const isLogin = (req, res, next) => {
  const token = getTokenFromHeader(req);
  const decodedUser = verifyToken(token);
  req.userId = decodedUser.id;
  if (!decodedUser) {
    return next(appErr("Invalid/Expire Token, Please Login again", 401));
  }
  next();
};

module.exports = isLogin;

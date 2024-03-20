const getTokenFromHeader = (req) => {
  const header = req.headers;

  const token = header.authorization.split(" ")[1];

  if (token !== undefined) {
    return token;
  } else {
    return {
      status: "Failed",
      message: "There is no token attached to the header",
    };
  }
};

module.exports = getTokenFromHeader;

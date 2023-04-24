const jwt = require("jsonwebtoken");

const createJWTToken = (content, config) => {
  return jwt.sign({ content }, process.env.ACCESS_TOKEN_SECRET, config);
};

module.exports = createJWTToken;

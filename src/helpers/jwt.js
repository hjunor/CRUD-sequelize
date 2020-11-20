require("dotenv").config();
const jwt = require("jsonwebtoken");
const tokenPrivatekey = process.env.JWT_PRIVATE_KEY;
const refreshTokenPrivatekey = process.env.JWT_PRIVATE_kEY_REFRESH;

const options = { expiresIn: "30 minutes" };
const refreshOptions = { expiresIn: "30 days" };

const generateJwt = (payload) => {
  return jwt.sign(payload, tokenPrivatekey, options);
};

const generateRefreshJwt = (payload) => {
  return jwt.sign(payload, refreshTokenPrivatekey, refreshOptions);
};

const verifyJwt = (token) => {
  return jwt.verify(token, tokenPrivatekey);
};

const verifyRefreshJwt = (token) => {
  return jwt.verify(token, refreshTokenPrivatekey);
};
module.exports = {
  generateJwt,
  generateRefreshJwt,
  verifyJwt,
  verifyRefreshJwt,
};

const { verifyJwt, getTokenFromHeaders } = require("../helpers/jwt");

const checkJwt = (req, res, next) => {
  try {
    const { url: path } = req;

    const token = getTokenFromHeaders(req.headers);

    if (!token) {
      return res.jsonUnauthorized(null, "Invalid token");
    }

    const decoded = verifyJwt(token);
    req.accountId = decoded.id;
  } catch (error) {
    return res.jsonUnauthorized(null, "Invalid token");
  }
  console.log("*** account jwt", req.accountId);
  next();
};

module.exports = checkJwt;

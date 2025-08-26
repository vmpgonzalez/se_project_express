const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    const err = new Error("Authorization required");
    err.statusCode = 401;
    return next(err);
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch (e) {
    e.statusCode = 401;
    e.message = "Invalid or expired token";
    return next(e);
  }
  return next();
};

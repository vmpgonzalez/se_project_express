const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const BadRequestError = require("../errors/BadRequestError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");
const { JWT_SECRET } = require("../utils/config");

const SALT_ROUNDS = 10;

// POST /signup
module.exports.createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body || {};

  if (!name || !avatar || !email || !password) {
    return next(new BadRequestError("All fields are required"));
  }

  return bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const obj = user.toObject();
      delete obj.password;
      return res.status(201).send(obj);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError("Email already in use"));
      }

      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data"));
      }

      return next(err);
    });
};

// POST /signin
module.exports.login = (req, res, next) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.send({ token });
    })
    .catch((err) => {
      const msg = (err && err.message) || "";

      if (msg.includes("Incorrect email or password")) {
        return next(new UnauthorizedError("Incorrect email or password"));
      }

      return next(err);
    });
};

// GET /users/me
module.exports.getCurrentUser = (req, res, next) =>
  User.findById(req.user._id)
    .orFail(() => new NotFoundError("User not found"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid user ID"));
      }

      return next(err);
    });

// PATCH /users/me
module.exports.updateUser = (req, res, next) => {
  const { name, avatar } = req.body || {};

  return User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError("User not found"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data"));
      }

      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid user ID"));
      }

      return next(err);
    });
};

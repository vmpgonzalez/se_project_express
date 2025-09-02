const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  UNAUTHORIZED,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const SALT_ROUNDS = 10;

// POST /signup
module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body || {};
  if (!name || !avatar || !email || !password) {
    return res.status(BAD_REQUEST).send({ message: "All fields are required" });
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
        return res.status(CONFLICT).send({ message: "Email already in use" });
      }
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Server error" });
    });
};

// POST /signin
module.exports.login = (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Email and password are required" });
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
      if (
        err.statusCode === UNAUTHORIZED ||
        msg.includes("Incorrect email or password")
      ) {
        return res
          .status(UNAUTHORIZED)
          .send({ message: "Incorrect email or password" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Server error" });
    });
};

// GET /users/me
module.exports.getCurrentUser = (req, res) =>
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid user ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Server error" });
    });

// PATCH /users/me
module.exports.updateUser = (req, res) => {
  const { name, avatar } = req.body || {};
  return User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Server error" });
    });
};

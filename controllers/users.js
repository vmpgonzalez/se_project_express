const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).send({ message: "Server error" });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => new Error("UserNotFound"))
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.message === "UserNotFound") {
        res.status(NOT_FOUND).send({ message: "User not found" });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid user ID" });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: "Server error" });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({ message: "Invalid data" });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: "Server error" });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => new Error("UserNotFound"))
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.message === "UserNotFound") {
        res.status(NOT_FOUND).send({ message: "User not found" });
      } else if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({ message: "Invalid data" });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: "Server error" });
      }
    });
};

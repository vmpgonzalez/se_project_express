const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 30 },
    avatar: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validator.isURL(v),
        message: "You must enter a valid URL",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: "Invalid email format",
      },
    },
    password: { type: String, required: true, select: false },
  },
  { versionKey: false }
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        const err = new Error("Incorrect email or password");
        err.statusCode = 401;
        throw err;
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          const err = new Error("Incorrect email or password");
          err.statusCode = 401;
          throw err;
        }
        return user;
      });
    });
};

module.exports = mongoose.model("User", userSchema);

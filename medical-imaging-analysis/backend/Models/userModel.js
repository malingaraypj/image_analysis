const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v);
      },
      message: "Phone number should be 10 digits",
    },
    required: [true, "Please provide a phone number"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "this email is already in use"],
    validate: [validator.isEmail, "Provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Passwords do not match",
    },
  },
});

UserSchema.pre("save", function (next) {
  this.confirmPassword = undefined;
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

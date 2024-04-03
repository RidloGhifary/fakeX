const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    dateOfBirth: Date,
    verified: Boolean,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");

const userOtpVerificationSchema = new mongoose.Schema({
  userId: String,
  otpCode: String,
  createdAt: String,
  expiredAt: String,
});

const UserOtpVerification = mongoose.model(
  "UserOtpVerification",
  userOtpVerificationSchema
);

module.exports = UserOtpVerification;

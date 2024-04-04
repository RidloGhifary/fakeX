const mongoose = require("mongoose");

const UserVerificationBadgeSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  otpCode: String,
  createdAt: String,
  expiredAt: String,
});

const UserVerificationBadge = mongoose.model(
  "UserVerificationBadge",
  UserVerificationBadgeSchema
);

module.exports = UserVerificationBadge;

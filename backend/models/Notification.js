const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
    read: {
      type: Boolean,
      require: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;

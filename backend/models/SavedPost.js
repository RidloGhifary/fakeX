const mongoose = require("mongoose");

const SavedPostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Post",
    },
  },
  { timestamps: true }
);

const SavedPost = mongoose.model("SavedPost", SavedPostSchema);

module.exports = SavedPost;

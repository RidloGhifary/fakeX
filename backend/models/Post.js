const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema(
  {
    user: {
      userId: mongoose.Schema.Types.ObjectId,
      username: String,
      profile_picture: String,
      hasBadge: Boolean,
    },
    content: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const commentSchema = new mongoose.Schema(
  {
    user: {
      userId: mongoose.Schema.Types.ObjectId,
      username: String,
      profile_picture: String,
      hasBadge: Boolean,
    },
    content: {
      type: String,
      required: true,
    },
    edited: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    replies: [ReplySchema],
  },
  { timestamps: true }
);

const PostSchema = new mongoose.Schema(
  {
    user: {
      userId: mongoose.Schema.Types.ObjectId,
      username: String,
      bio: String,
      profile_picture: String,
      hasBadge: Boolean,
      followers: [String],
    },
    content: {
      type: String,
      require: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [commentSchema],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;

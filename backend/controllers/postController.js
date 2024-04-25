const Post = require("../models/Post.js");
const User = require("../models/User.js");
const { validationResult } = require("express-validator");

const GetAllPost = async (_, res) => {
  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .sort({ likes: 1 })
      .populate({
        path: "user",
        select: "username bio profile_picture followers hasBadge",
        populate: {
          path: "followers",
          select: "username profile_picture hasBadge",
        },
      })
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "username profile_picture hasBadge",
        },
      });

    res.status(200).json(posts);
  } catch (err) {
    console.log("🚀 ~ GetAllPost ~ err:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const GetPostByFollowing = async (req, res) => {
  const userId = req.id;

  try {
    const currentUser = await User.findById(userId);
    if (!currentUser)
      return res.status(404).json({ message: "User not found" });

    const followingIds = currentUser.following;
    const posts = await Post.find({ user: { $in: followingIds } })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "userId username bio profile_picture followers hasBadge",
        populate: {
          path: "followers",
          select: "userId username profile_picture hasBadge",
        },
      })
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "userId username profile_picture hasBadge",
        },
      });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const GetPostByUserCreator = async (req, res) => {
  const {
    params: { username },
  } = req;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const posts = await Post.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "_id username bio profile_picture followers hasBadge",
      });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const GetDetailPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById({ _id: postId })
      .populate({
        path: "user",
        select: "userId username bio profile_picture followers hasBadge",
        populate: {
          path: "followers",
          select: "userId username profile_picture hasBadge",
        },
      })
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "userId username profile_picture hasBadge",
        },
      })
      .populate({
        path: "comments.replies",
        populate: {
          path: "user",
          select: "userId username profile_picture hasBadge",
        },
      });

    if (!post) return res.status(404).json({ message: "Cannot found post" });

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const CreatePost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ message: errors.array() });

  const { content } = req.body;

  try {
    const user = await User.findById(req.id).select("-password");

    const newPost = new Post({
      user: user._id,
      content,
      likes: [],
      comments: [],
    });

    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const DeletePost = async (req, res) => {
  const {
    params: { postId },
  } = req;

  try {
    const currentPost = await Post.findById({ _id: postId });
    if (!currentPost)
      return res.status(404).json({ message: "Cannot found post" });

    if (req.id !== currentPost.user._id.toString())
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });

    await Post.deleteOne({ _id: postId });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const EditPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ message: errors.array() });

  const {
    params: { postId },
    body: { content },
  } = req;

  try {
    const currentPost = await Post.findById({ _id: postId });
    if (!currentPost)
      return res.status(404).json({ message: "Cannot found post" });

    if (req.id !== currentPost.user._id.toString())
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this post" });

    currentPost.content = content;
    await currentPost.save();
    res.status(200).json({ message: "Post updated successfully", currentPost });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const LikePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const currentPost = await Post.findById(postId);
    if (!currentPost)
      return res.status(404).json({ message: "Cannot find post" });

    const hasLikeIndex = currentPost.likes.indexOf(req.id);

    if (hasLikeIndex !== -1) {
      currentPost.likes.splice(hasLikeIndex, 1);
      await currentPost.save();
      return res.status(200).json({ message: "Post unliked successfully" });
    }

    currentPost.likes.push(req.id);
    await currentPost.save();

    res.status(200).json({ message: "Post liked successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const CommentPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ message: errors.array() });

  const {
    body: { content },
    params: { postId },
  } = req;

  try {
    const user = await User.findById(req.id).select("-password");

    const currentPost = await Post.findById(postId);
    if (!currentPost)
      return res.status(404).json({ message: "Cannot find post" });

    currentPost.comments.push({
      user: user._id,
      content,
    });
    await currentPost.save();
    res.status(201).json({ message: "Comment added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const DeleteComment = async (req, res) => {
  const {
    params: { commentId, postId },
  } = req;

  try {
    const currentPost = await Post.findById(postId);
    if (!currentPost)
      return res.status(404).json({ message: "Cannot find post" });

    const hasCommentIndex = currentPost.comments.findIndex(
      (comment) => comment._id == commentId
    );

    if (hasCommentIndex === -1)
      return res.status(404).json({ message: "Comment not found" });

    if (req.id !== currentPost.comments[hasCommentIndex].userId.toString())
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this comment" });

    currentPost.comments.splice(hasCommentIndex, 1);
    await currentPost.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const EditComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ message: errors.array() });

  const {
    params: { commentId, postId },
    body: { content },
  } = req;
  try {
    const currentPost = await Post.findById(postId);
    if (!currentPost)
      return res.status(404).json({ message: "Cannot find post" });

    const hasCommentIndex = currentPost.comments.findIndex(
      (comment) => comment._id == commentId
    );

    if (hasCommentIndex === -1)
      return res.status(404).json({ message: "Comment not found" });

    if (req.id !== currentPost.comments[hasCommentIndex].userId.toString())
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this comment" });

    currentPost.comments[hasCommentIndex].content = content;
    currentPost.comments[hasCommentIndex].updatedAt = Date.now();
    currentPost.comments[hasCommentIndex].edited = true;
    await currentPost.save();

    res.status(200).json({ message: "Comment edited successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const ReplyComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ message: errors.array() });

  const {
    params: { commentId, postId },
    body: { content },
  } = req;

  try {
    const user = await User.findById(req.id).select("-password");

    const currentPost = await Post.findById(postId);
    if (!currentPost)
      return res.status(404).json({ message: "Cannot find post" });

    const hasComment = currentPost.comments.find(
      (comment) => comment._id == commentId
    );
    if (!hasComment)
      return res.status(404).json({ message: "Comment not found" });

    hasComment.replies.push({
      user: user._id,
      content,
    });
    await currentPost.save();

    res.status(200).json({ message: "Reply added successfully" });
  } catch (err) {
    console.log("🚀 ~ ReplyComment ~ err:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const GetCommentByPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comments = post.comments;
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const LikeComment = async (req, res) => {
  const {
    params: { commentId, postId },
  } = req;

  try {
    const currentPost = await Post.findById(postId);
    if (!currentPost)
      return res.status(404).json({ message: "Post not found" });

    const commentIndex = currentPost.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );
    if (commentIndex === -1)
      return res.status(404).json({ message: "Comment not found" });

    const userHasLiked = currentPost.comments[commentIndex].likes.indexOf(
      req.id
    );

    if (userHasLiked !== -1) {
      currentPost.comments[commentIndex].likes.splice(userHasLiked, 1);
    } else {
      currentPost.comments[commentIndex].likes.push(req.id);
    }

    await currentPost.save();
    res.status(200).json({ message: "Comment liked/unliked successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const LikeReplyComment = async (req, res) => {
  const {
    params: { commentId, postId, replyCommentId },
  } = req;

  try {
    const currentPost = await Post.findById(postId);
    if (!currentPost)
      return res.status(404).json({ message: "Post not found" });

    const commentIndex = currentPost.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );
    if (commentIndex === -1)
      return res.status(404).json({ message: "Comment not found" });

    const replyCommentIndex = currentPost.comments[
      commentIndex
    ].replies.findIndex(
      (replyComment) => replyComment._id.toString() === replyCommentId
    );
    if (replyCommentIndex === -1)
      return res.status(404).json({ message: "Reply comment not found" });

    const userHasLiked = currentPost.comments[commentIndex].replies[
      replyCommentIndex
    ].likes.indexOf(req.id);

    if (userHasLiked !== -1) {
      currentPost.comments[commentIndex].replies[
        replyCommentIndex
      ].likes.splice(userHasLiked, 1);
    } else {
      currentPost.comments[commentIndex].replies[replyCommentIndex].likes.push(
        req.id
      );
    }

    await currentPost.save();
    res
      .status(200)
      .json({ message: "Reply Comment liked/unliked successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const DeleteReplyComment = async (req, res) => {
  const {
    params: { commentId, postId, replyCommentId },
  } = req;

  try {
    const currentPost = await Post.findById(postId);
    if (!currentPost)
      return res.status(404).json({ message: "Post not found" });

    const commentIndex = currentPost.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );
    if (commentIndex === -1)
      return res.status(404).json({ message: "Comment not found" });

    const replyCommentIndex = currentPost.comments[
      commentIndex
    ].replies.findIndex(
      (replyComment) => replyComment._id.toString() === replyCommentId
    );
    if (replyCommentIndex === -1)
      return res.status(404).json({ message: "Reply comment not found" });

    if (
      req.id.toString() !==
      currentPost.comments[commentIndex].replies[
        replyCommentIndex
      ].userId.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this comment reply" });
    }

    currentPost.comments[commentIndex].replies.splice(replyCommentIndex, 1);
    await currentPost.save();
    res.status(200).json({ message: "Reply comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const EditReplyComment = async (req, res) => {
  const {
    params: { commentId, postId, replyCommentId },
    body: { content },
  } = req;

  try {
    const currentPost = await Post.findById(postId);
    if (!currentPost)
      return res.status(404).json({ message: "Post not found" });

    const commentIndex = currentPost.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );
    if (commentIndex === -1)
      return res.status(404).json({ message: "Comment not found" });

    const replyCommentIndex = currentPost.comments[
      commentIndex
    ].replies.findIndex(
      (replyComment) => replyComment._id.toString() === replyCommentId
    );
    if (replyCommentIndex === -1)
      return res.status(404).json({ message: "Reply comment not found" });

    if (
      req.id.toString() !==
      currentPost.comments[commentIndex].replies[
        replyCommentIndex
      ].userId.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this comment reply" });
    }

    const replyComment =
      currentPost.comments[commentIndex].replies[replyCommentIndex];

    replyComment.content = content;
    replyComment.updatedAt = new Date();

    await currentPost.save();
    res.status(200).json({ message: "Reply comment edited successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  GetAllPost,
  GetPostByFollowing,
  GetPostByUserCreator,
  GetDetailPost,
  CreatePost,
  DeletePost,
  EditPost,
  LikePost,
  CommentPost,
  DeleteComment,
  EditComment,
  ReplyComment,
  GetCommentByPost,
  LikeComment,
  LikeReplyComment,
  DeleteReplyComment,
  EditReplyComment,
};

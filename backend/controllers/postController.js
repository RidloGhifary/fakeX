const Post = require("../models/Post");

const CreatePost = async (req, res) => {
  const { content } = req.body;

  try {
    const newPost = new Post({
      userId: req.id,
      content,
      likes: [],
      comments: [],
    });

    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
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
  const {
    body: { comment },
    params: { postId },
  } = req;

  try {
    const currentPost = await Post.findById(postId);
    if (!currentPost)
      return res.status(404).json({ message: "Cannot find post" });

    currentPost.comments.push({ userId: req.id, content: comment });
    await currentPost.save();
    res.status(201).json({ message: "Comment added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { CreatePost, LikePost, CommentPost };

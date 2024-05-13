const Post = require("../models/Post");

const GetLikedPostByUser = async (req, res) => {
  const {
    params: { userId },
  } = req;

  try {
    const likedPosts = await Post.find({ likes: userId }).populate({
      path: "user",
      select: "username hasBadge followers profile_picture bio",
    });

    const likedPostsWithComments = likedPosts.map((post) => {
      return {
        ...post.toObject(),
        comments: post.comments.map((comment) => comment._id),
      };
    });

    res.status(200).json(likedPostsWithComments);
  } catch (err) {
    console.log("🚀 ~ GetLikedPostByUser ~ err:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { GetLikedPostByUser };

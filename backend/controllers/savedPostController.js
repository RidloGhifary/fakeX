const SavedPost = require("../models/SavedPost");

const GetSavedPost = async (req, res) => {
  const {
    params: { userId },
  } = req;

  try {
    const savedPost = await SavedPost.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "post",
        select: "user content likes comments createdAt updatedAt",
        populate: {
          path: "user",
          select: "username hasBadge followers profile_picture bio",
        },
      })
      .populate({
        path: "user",
        select: "username profile_picture bio followers hasBadge",
        populate: {
          path: "followers",
          select: "username profile_picture hasBadge",
        },
      });

    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const SavePost = async (req, res) => {
  const {
    params: { userId, postId },
  } = req;

  try {
    const existingPostSaved = await SavedPost.findOne({
      user: userId,
      post: postId,
    });

    if (existingPostSaved) {
      await existingPostSaved.deleteOne();
      res.status(200).send({ message: "Post has been unsaved" });
    } else {
      const savedPost = new SavedPost({
        user: userId,
        post: postId,
      });

      await savedPost.save();
      res.status(201).send({ message: "Saved successful" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { GetSavedPost, SavePost };

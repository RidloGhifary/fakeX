const express = require("express");
const { body } = require("express-validator");
const postController = require("../controllers/postController.js");
const verifyToken = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post(
  "/create",
  verifyToken,
  [
    body("content")
      .trim()
      .notEmpty()
      .withMessage("Content is required")
      .isLength({ max: 500 })
      .withMessage("Content cannot exceed 500 characters"),
  ],
  postController.CreatePost
);

router.post("/like/:postId", verifyToken, postController.LikePost);
router.post(
  "/comment/:postId",
  verifyToken,
  [
    body("content")
      .trim()
      .notEmpty()
      .withMessage("Content is required")
      .isLength({ min: 1 }),
  ],
  postController.CommentPost
);
router.post(
  "/comment/:commentId/delete/:postId",
  verifyToken,
  postController.DeleteComment
);

module.exports = router;

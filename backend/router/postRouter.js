const express = require("express");
const { body } = require("express-validator");
const postController = require("../controllers/postController.js");
const verifyToken = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/", postController.GetAllPost);
router.get("/byfollowing", verifyToken, postController.GetPostByFollowing);
router.get("/:postId", postController.GetDetailPost);
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
router.post("/delete/:postId", verifyToken, postController.DeletePost);
router.post(
  "/edit/:postId",
  verifyToken,
  [
    body("content")
      .trim()
      .notEmpty()
      .withMessage("Content is required")
      .isLength({ max: 500 })
      .withMessage("Content cannot exceed 500 characters"),
  ],
  postController.EditPost
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
router.post(
  "/comment/:commentId/edit/:postId",
  verifyToken,
  [
    body("content")
      .trim()
      .notEmpty()
      .withMessage("Content is required")
      .isLength({ min: 1 }),
  ],
  postController.EditComment
);
router.post(
  "/comment/:commentId/reply/:postId",
  verifyToken,
  [
    body("content")
      .trim()
      .notEmpty()
      .withMessage("Content is required")
      .isLength({ min: 1 }),
  ],
  postController.ReplyComment
);
router.get("/comment/:postId", postController.GetCommentByPost);
router.post(
  "/comment/:commentId/like/:postId",
  verifyToken,
  postController.LikeComment
);
router.post(
  "/comment/:commentId/like-reply/:postId/:replyCommentId",
  verifyToken,
  postController.LikeReplyComment
);
router.post(
  "/comment/:commentId/delete-reply/:postId/:replyCommentId",
  verifyToken,
  postController.DeleteReplyComment
);
router.post(
  "/comment/:commentId/edit-reply/:postId/:replyCommentId",
  verifyToken,
  [
    body("content")
      .trim()
      .notEmpty()
      .withMessage("Content is required")
      .isLength({ min: 1 }),
  ],
  postController.EditReplyComment
);

module.exports = router;

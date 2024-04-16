const express = require("express");
const userController = require("../controllers/userController.js");
const verifyToken = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/", verifyToken, userController.CurrentUser);
router.get("/post/:userId", verifyToken, userController.GetUserByPostId);
router.patch("/update/:userId", verifyToken, userController.UpdateAccount);
router.post("/follow/:userId", verifyToken, userController.FollowingUser);
router.get("/followers", verifyToken, userController.FollowersList);
router.post(
  "/verification/request",
  verifyToken,
  userController.VerificationRequest
);
router.post("/getyourbadge/:userId", verifyToken, userController.GetTheBadge);

module.exports = router;

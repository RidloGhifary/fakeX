const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const likedPostController = require("../controllers/likedPostController");

const router = express.Router();

router.get("/:userId", verifyToken, likedPostController.GetLikedPostByUser);

module.exports = router;

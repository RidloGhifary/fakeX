const express = require("express");
const verifyToken = require("../middlewares/authMiddleware.js");
const savedPostController = require("../controllers/savedPostController.js");

const router = express.Router();

router.get("/:userId", verifyToken, savedPostController.GetSavedPost);
router.post("/:postId/:userId", verifyToken, savedPostController.SavePost);

module.exports = router;

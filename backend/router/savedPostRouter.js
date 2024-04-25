const express = require("express");
const verifyToken = require("../middlewares/authMiddleware.js");
const savedPostController = require("../controllers/savedPostController.js");

const router = express.Router();

router.post("/:postId/:userId", verifyToken, savedPostController.SavedPost);

module.exports = router;

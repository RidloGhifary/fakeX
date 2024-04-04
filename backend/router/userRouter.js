const express = require("express");
const userController = require("../controllers/userController.js");
const verifyToken = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/", verifyToken, userController.CurrentUser);
router.patch("/update/:userId", verifyToken, userController.UpdateAccount);
router.post("/follow/:userId", verifyToken, userController.FollowingUser);

module.exports = router;

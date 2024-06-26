const express = require("express");
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/sign-up",
  [
    check("username", "username is required")
      .isString()
      .isLength({ min: 3, max: 15 })
      .custom((value) => /^[a-z0-9_]+$/.test(value))
      .withMessage(
        "Username must contain only lowercase letters and no special characters"
      ),
    check("email", "email is required").isEmail(),
    check("password", "password with 8 character or more is required").isLength(
      { min: 8 }
    ),
  ],
  authController.SignUp
);

router.post(
  "/sign-in",
  [
    check("username", "username is required")
      .isString()
      .isLength({ min: 3, max: 15 })
      .custom((value) => /^[a-z]+$/.test(value))
      .withMessage(
        "Username must contain only lowercase letters and no special characters"
      ),
    check("password", "password with 8 character or more is required").isLength(
      {
        min: 8,
      }
    ),
  ],
  authController.SignIn
);

router.post("/verifyOTP/:userId", authController.verifyOTP);

router.post("/logout", verifyToken, authController.Logout);

router.get("/validate-token", verifyToken, authController.ValidateToken);

module.exports = router;

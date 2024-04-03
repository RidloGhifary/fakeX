const express = require("express");
const router = express.Router();
const forgotPass = require("../controllers/forgotPassController.js");

router.post("/forgot-password", forgotPass.ForgotPassword);
router.post("/reset-password", forgotPass.ResetPassword);

module.exports = router;

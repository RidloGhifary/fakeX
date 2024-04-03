const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const User = require("../models/User.js");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const sendResetPasswordEmail = async (email, token) => {
  let transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: process.env.AUTH_USER_NODEMAILER,
      pass: process.env.AUTH_PASS_NODEMAILER,
    },
  });

  const resetPasswordLink = `${process.env.BASE_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: "fakeX <fakex@demomailtrap.com>",
    to: email,
    subject: "Reset Your Password",
    html: `
      <p>You've requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetPasswordLink}">Reset Password</a>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const ForgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = generateToken(user._id);
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;

    await user.save();
    await sendResetPasswordEmail(email, token);
    res.status(200).json({ message: "Reset password email sent" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const ResetPassword = async (req, res) => {
  const { token } = req.query;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({ resetPasswordToken: token });
    if (!user || user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { ForgotPassword, ResetPassword };

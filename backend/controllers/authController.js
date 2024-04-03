const User = require("../models/User.js");
const UserOtpVerification = require("../models/UserOtpVerification.js");
const transporter = require("../utils/nodemailer.js");
// const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

transporter.verify((error, success) => {
  if (error) console.log(error);
  else console.log(success);
});

const SignUp = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ message: errors.array() });

  let { username, email, password, dateOfBirth } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: email }, { username, username }],
    });

    if (user)
      return res.status(400).json({ message: "User or email already exist" });

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      dateOfBirth,
      verified: false,
    });

    await newUser
      .save()
      .then((result) => {
        // TODO - HANDLE SEND VERIFICATION OTP CODE
        sendOtpVerificationCode(result, res);
      })
      .catch((err) => {
        res.status(400).json({ message: "Error while creating user account" });
      });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).send({ message: "User created successful" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const SignIn = async (req, res) => {
  let { username, password } = req.body;

  try {
    // TODO - CHECK USERNAME EXISTED
    const currentUser = await User.findOne({ username: username });
    if (!currentUser)
      return res.status(404).json({ message: "Cannot find username" });

    const validatePassword = bcrypt.compareSync(password, currentUser.password);
    if (!validatePassword)
      return res.status(401).json({ message: "Wrong credentials" });

    const token = jwt.sign({ id: currentUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...others } = currentUser._doc;

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json(others);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const sendOtpVerificationCode = async ({ _id, email }, res) => {
  try {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const mailOptions = {
      from: `fakeX <${process.env.AUTH_USER_NODEMAILER}>`,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Enter ${otp} in the app to verify your email address and complete the sign up</p><p>this code will expires in <b>1 hour</b></p>`,
    };

    const hashedOtp = bcrypt.hashSync(otp, 10);

    const newOtpVerification = new UserOtpVerification({
      userId: _id,
      otpCode: hashedOtp,
      createdAt: Date.now(),
      expiredAt: Date.now() + 3600000,
    });

    await newOtpVerification.save();
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json({
      status: "PENDING",
      message: "Verification otp code email sent",
      data: {
        userId: _id,
        email,
      },
    });
  } catch (err) {
    res.json({
      status: "FAILED",
      message: err.message,
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    let { userId, otp } = req.body;

    if (!userId || !otp) {
      throw Error("Empty otp details are not allowed");
    } else {
      const userOtpVerificationRecords = await UserOtpVerification.find({
        userId,
      });

      if (userOtpVerificationRecords.length <= 0) {
        throw Error(
          "Account record doesn`t exist or has been verified already, please sing up or sing in"
        );
      } else {
        const { expiredAt } = userOtpVerificationRecords[0];
        const hashedOtp = userOtpVerificationRecords[0].otp;

        if (expiredAt < Date.now()) {
          await UserOtpVerification.deleteMany({ userId });
          throw new Error("Code has expired, please request one more time");
        } else {
          const validOtp = bcrypt.compareSync(otp, hashedOtp);

          if (!validOtp) {
            throw new Error("Invalid code passed, check your email");
          } else {
            await User.updateOne({ _id: userId }, { verified: true });
            await UserOtpVerification.deleteMany({ userId });
            res.json({
              status: "VERIFIED",
              message: "User email already verified",
            });
          }
        }
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { SignUp, SignIn, verifyOTP };

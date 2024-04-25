const User = require("../models/User.js");
const UserVerificationBadge = require("../models/UserVerificationBadge.js");
const transporter = require("../utils/nodemailer.js");
const bcrypt = require("bcrypt");

const CurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.id).select("-password");
    if (!user) return res.status(404).json({ message: "Cannot find user" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const GetParticularUser = async (req, res) => {
  const {
    params: { username },
  } = req;

  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user) return res.status(404).json({ message: "Cannot find user" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const UpdateAccount = async (req, res) => {
  const {
    params: { userId },
    body: { profile_picture, username, bio },
  } = req;

  try {
    if (req.id !== userId)
      return res.status(401).send({ message: "Unauthorized" });

    if (!/^[a-zA-Z0-9_]+$/.test(username) || /\s/.test(username)) {
      return res.status(400).json({
        message:
          "Username can only contain letters, numbers, and underscore (_) characters and cannot contain spaces",
      });
    }

    if (bio.length > 50)
      return res
        .status(400)
        .json({ message: "Bio character cannot more than 100" });

    const currentUser = await User.findById(req.id);
    if (!currentUser)
      return res.status(404).json({ message: "User not found" });

    let nextUsernameChangeDate = new Date(currentUser.lastUsernameChange);
    nextUsernameChangeDate.setDate(nextUsernameChangeDate.getDate() + 30);

    if (
      username !== undefined &&
      username !== currentUser.username &&
      Date.now() < nextUsernameChangeDate
    )
      return res.status(400).json({
        message: "You can change your username only once every 30 days",
      });

    const updateAccount = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          username: username,
          bio: bio,
          profile_picture: profile_picture,
          lastUsernameChange:
            username !== currentUser.username
              ? Date.now()
              : currentUser.lastUsernameChange,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );

    const { password, ...others } = updateAccount._doc;

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const FollowingUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const currentUser = await User.findById(req.id);
    const userToFollow = await User.findById(userId);

    if (currentUser._id.toString() === userId)
      return res
        .status(403)
        .json({ message: "Cannot follow your own account" });

    if (!userToFollow)
      return res.status(404).json({ message: "User to follow not found" });

    const isFollowing = currentUser.following.includes(userId);

    if (isFollowing) {
      const indexToRemove = currentUser.following.indexOf(userId);
      if (indexToRemove !== -1) {
        currentUser.following.splice(indexToRemove, 1);
      }

      const followerIndexToRemove = userToFollow.followers.indexOf(req.id);
      if (followerIndexToRemove !== -1) {
        userToFollow.followers.splice(followerIndexToRemove, 1);
      }

      await Promise.all([currentUser.save(), userToFollow.save()]);
      return res.status(200).json({ message: "Successfully unfollowed user" });
    } else {
      currentUser.following.push(userId);
      userToFollow.followers.push(req.id);
      await currentUser.save();
      await userToFollow.save();
      return res.status(200).json({ message: "Successfully followed user" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const FollowersList = async (req, res) => {
  try {
    const currentUser = await User.findById(req.id);
    const followers = await User.find({
      _id: { $in: currentUser.followers },
    });
    res.status(200).json({ followers });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const VerificationRequest = async (req, res) => {
  try {
    const currentUser = await User.findById(req.id);
    if (!currentUser)
      return res.status(404).json({ message: "User not found" });

    currentUser.verificationBadgeRequested = true;
    await currentUser.save();
    await sendVerificationBadgeEmail(currentUser);

    res
      .status(200)
      .json({ message: "Verification request submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const sendVerificationBadgeEmail = async (currentUser) => {
  try {
    const otpCode = `${Math.floor(100000 + Math.random() * 900000)}`;

    const mailOptions = {
      from: "fakeX <fakex@demomailtrap.com>",
      to: currentUser.email,
      subject: "Request for Verification Badge",
      html: `<!DOCTYPE html>
              <html lang="en">

              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Email Verification</title>
                  <style>
                      body {
                          font-family: Arial, sans-serif;
                          margin: 0;
                          padding: 0;
                          background-color: #f4f4f4;
                          text-align: center;
                      }

                      .container {
                          max-width: 600px;
                          margin: 20px auto;
                          padding: 20px;
                          background-color: #fff;
                          border-radius: 8px;
                          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                      }

                      .btn {
                          display: inline-block;
                          padding: 8px 18px;
                          background-color: rgba(0, 0, 0);
                          color: #fff;
                          text-decoration: none;
                          border-radius: 4px;
                          font-size: 14px;
                      }
                  </style>
              </head>

              <body>
                  <div class="container">
                      <p>Hello, <b>${currentUser.username}</b></p>
                      <p>You've requested a verification badge for your account. Please click the button below to confirm your request:</p>
                      <a href="http://localhost:3000/getyourbadge${currentUser._id.toString()}?token=${otpCode}" class="btn">Verify My Account</a>
                  </div>
              </body>

              </html>
              `,
    };

    const hashedOtpCode = bcrypt.hashSync(otpCode, 10);

    const newUserVerificationBadgeStatus = new UserVerificationBadge({
      userId: currentUser._id,
      otpCode: hashedOtpCode,
      createdAt: Date.now(),
      expiredAt: Date.now() + 3600000,
    });

    await newUserVerificationBadgeStatus.save();
    await transporter.sendMail(mailOptions);
    return {
      status: "PENDING",
      message: "Request for Verification Badge sent",
      data: {
        userId: currentUser._id,
        email,
      },
    };
  } catch (err) {
    return {
      status: "FAILED",
      message: err.message,
    };
  }
};

const GetTheBadge = async (req, res) => {
  const {
    query: { token },
    params: { userId },
  } = req;

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    const userVerificationBadgeRecord = await UserVerificationBadge.find({
      userId,
      expiredAt: { $gte: Date.now() },
    });

    if (!userVerificationBadgeRecord) {
      return res.status(400).json({ message: "Invalid or expired token" });
    } else {
      const { otpCode, expiredAt, userId } = userVerificationBadgeRecord[0];

      if (expiredAt < Date.now()) {
        await UserVerificationBadge.deleteMany({ userId });
        throw new Error("Code has expired, please request one more time");
      }

      const validCode = bcrypt.compareSync(token, otpCode);
      if (!validCode) {
        throw new Error("Invalid code passed, check your email");
      }

      await User.updateOne(
        { _id: userId },
        { hasBadge: true, verificationBadgeRequested: false }
      );
      await UserVerificationBadge.deleteMany({ userId });

      res.json({
        status: "GOT IT",
        message: "User email already has a verified badge",
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  UpdateAccount,
  CurrentUser,
  GetParticularUser,
  FollowingUser,
  FollowersList,
  VerificationRequest,
  GetTheBadge,
};

const User = require("../models/User.js");

const CurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.id).select("-password");
    if (!user) return res.status(404).json({ message: "Cannot find user" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const UpdateAccount = async (req, res) => {
  try {
    const {
      params: { userId },
      body: { profile_picture, username, bio },
    } = req;

    if (req.id !== userId)
      return res.status(401).send({ message: "Unauthorized" });

    if (!/^[a-zA-Z0-9_]+$/.test(username) || /\s/.test(username)) {
      return res.status(400).json({
        message:
          "Username can only contain letters, numbers, and underscore (_) characters and cannot contain spaces",
      });
    }

    const updateAccount = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          username: username,
          bio: bio,
          profile_picture: profile_picture,
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

module.exports = { UpdateAccount, CurrentUser };

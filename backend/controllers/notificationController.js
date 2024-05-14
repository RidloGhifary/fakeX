const Notification = require("../models/Notification");

const GetUserNotification = async (req, res) => {
  try {
    const currentNotifications = await Notification.find({
      recipient: req.id,
    })
      .populate({
        path: "sender",
        select: "username bio profile_picture followers hasBadge",
      })
      .sort({ createdAt: -1 });

    res.status(200).json(currentNotifications);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { GetUserNotification };

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

const UpdateNotificationReadStatus = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.id, read: false },
      { read: true }
    );
    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { GetUserNotification, UpdateNotificationReadStatus };

const express = require("express");
const notificationController = require("../controllers/notificationController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get(
  "/get-user-notification",
  verifyToken,
  notificationController.GetUserNotification
);
router.patch(
  "/read-all",
  verifyToken,
  notificationController.UpdateNotificationReadStatus
);

module.exports = router;

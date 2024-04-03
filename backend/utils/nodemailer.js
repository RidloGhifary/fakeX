const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: process.env.AUTH_USER_NODEMAILER,
    pass: process.env.AUTH_PASS_NODEMAILER,
  },
});

module.exports = transporter;

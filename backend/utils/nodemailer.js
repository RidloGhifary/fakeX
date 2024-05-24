const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ridloghfry@gmail.com",
    pass: process.env.APPLICATION_PASSWORD_FOR_NODEMAILER,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;

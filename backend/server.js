const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;

require("dotenv").config();
require("./db.js");

const authRouter = require("./router/authRouter.js");
const userRouter = require("./router/userRouter.js");
const forgotPassRouter = require("./router/forgotPassRouter.js");
const postRouter = require("./router/postRouter.js");

const app = express();
const PORT = process.env.PORT || 5100;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/credentials", forgotPassRouter);
app.use("/api/post", postRouter);

app.listen(PORT, () => console.log(`Running in port : ${PORT}`));

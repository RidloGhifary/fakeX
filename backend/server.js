const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

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

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/credentials", forgotPassRouter);
app.use("/api/post", postRouter);

app.listen(PORT, () => console.log(`Running in port : ${PORT}`));

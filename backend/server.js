const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");

require("dotenv").config();
require("./db.js");

const io = new Server({
  cors: process.env.BASE_URL,
});

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

const authRouter = require("./router/authRouter.js");
const userRouter = require("./router/userRouter.js");
const forgotPassRouter = require("./router/forgotPassRouter.js");
const postRouter = require("./router/postRouter.js");
const savedPostRouter = require("./router/savedPostRouter.js");

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
app.use("/api/saved-post", savedPostRouter);

io.listen(3000);
app.listen(PORT, () => console.log(`Running in port : ${PORT}`));

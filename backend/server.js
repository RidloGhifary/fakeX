const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
require("./db.js");

const authRouter = require("./router/authRouter.js");
const userRouter = require("./router/userRouter.js");

const app = express();
const PORT = process.env.PORT || 5100;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => console.log(`Running in port : ${PORT}`));

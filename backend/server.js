const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./db.js");

const authRouter = require("./router/authRouter.js");

const app = express();
const PORT = process.env.PORT || 5100;

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`Running in port : ${PORT}`));

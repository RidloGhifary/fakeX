const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("Database got some errors ", error));

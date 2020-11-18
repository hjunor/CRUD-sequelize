const express = require("express");
const authController = require("./controllers/auth");
const app = express();

app.use("/auth", authController);

app.listen(3001, () => {
  console.log("Server start 🔥");
});

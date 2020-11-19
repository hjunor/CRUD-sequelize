const express = require("express");
const db = require("./models/index");

const authController = require("./controllers/auth");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authController);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server start 🔥");
  });
});

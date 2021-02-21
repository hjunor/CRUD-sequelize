require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models/index");
const response = require("./middlewares/response");
const checkJwt = require("./middlewares/jwt");

const authController = require("./controllers/auth");
const linkController = require("./controllers/link");
const linksControler = require("./controllers/links");

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(response);
// app.use(checkJwt);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authController);
app.use("/link", linkController);
app.use("/links", linksControler);



db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("Server start 🔥", PORT);
  });
});

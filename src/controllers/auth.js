const express = require("express");

const router = express.Router();

router.get("/sing-in", (req, res) => {
  return res.json("Sing in!");
});

router.get("/sing-up", (req, res) => {
  return res.json("Sing up!");
});

module.exports = router;

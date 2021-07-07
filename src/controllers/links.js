const express = require("express");
const { Link, Account } = require("../models");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const account = await Account.findOne({ where: { id } });

    if (!account) return res.jsonNotFound();

    const links = await Link.findAll({ where: { accountId: id } });

    return res.jsonOK(links);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error server" });
  }
});

module.exports = router;

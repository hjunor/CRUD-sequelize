const express = require("express");
const { Link } = require("../models");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { accountId } = req;
    console.log(accountId);

    const links = await Link.findAll({ where: { accountId } });
    if (!links) return res.jsonNotFound();

    return res.jsonOK(links);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error server" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { accountId } = req;
    const { id } = req.params;
    const link = await Link.findOne({ where: { id, accountId } });

    if (!link) return res.jsonNotFound(null, "Não encontrado");

    return res.jsonOK(link);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error server" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { accountId, body } = req;

    const { label, url, isSocial } = body;

    const image = "https://google.com/image.jpg";

    const link = await Link.create({ label, url, isSocial, image, accountId });

    return res.jsonOK(link, "Links");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error server" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { accountId, body } = req;

    const fields = ["label", "url", "isSocial"];

    const link = await Link.findOne({ where: { id, accountId } });
    if (!link) return res.jsonNotFound();

    fields.map((fildName) => {
      const newValue = body[fildName];
      if (newValue != undefined) {
        link[fildName] = newValue;
      }
    });

    await link.save();

    return res.jsonOK(link);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error server" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { accountId } = req;

    const link = await Link.findOne({ where: { id, accountId } });
    if (!link) return res.jsonNotFound();

    await link.destroy();

    return res.jsonOK();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error server" });
  }
});

module.exports = router;

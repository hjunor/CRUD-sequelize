const express = require("express");
const { Link } = require("../models");
const router = express.Router();

router.get("/", async (req, res) => {
  const accountId = 1;

  const liks = await Link.findAll({ where: { accountId } });
  return res.jsonOK(liks);
});

router.get("/:id", async (req, res) => {
  const accountId = 1; // req.id
  const { id } = req.body;
  const link = await Link.findOne({ where: { id, accountId } });

  if (!link) return res.jsonNotFound(null, "Não encontrado");

  return res.jsonOK(link);
});

router.post("/", async (req, res) => {
  const { label, url, isSocial } = req.body;

  const accountId = 2; //red.id;
  const image = "https://google.com/image.jpg";

  const link = await Link.create({ label, url, isSocial, image, accountId });

  return res.jsonOK(link, "Links");
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const fields = ["label", "url", "isSocial"];

  const accountId = 1; //red.id;

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
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const accountId = 1;

  const link = await Link.findOne({ where: { id, accountId } });
  if (!link) return res.jsonNotFound();

  await link.destroy();

  return res.jsonOK();
});

module.exports = router;

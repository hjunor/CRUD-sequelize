const express = require("express");
const bcrypt = require("bcrypt");
const { Account } = require("../models");
const { getMessage } = require("../helpers/messages");
const {
  generateJwt,
  verifyJwt,
  generateRefreshJwt,
} = require("../helpers/jwt");
const { accountSingUp, accountSingIn } = require("../validators/account");
const router = express.Router();

const saltRounds = 10;

router.post("/sing-in", accountSingIn, async (req, res) => {
  const { email, password } = req.body;

  const account = await Account.findOne({ where: { email } });

  const match = account ? bcrypt.compareSync(password, account.password) : null;
  if (!match) {
    return res.jsonBadRequest(null, getMessage("account.signin.invalid"));
  }
  const token = generateJwt({ id: account.id });
  const refreshToken = generateRefreshJwt({ id: account.id });

  return res.jsonOK(account, getMessage("account.signin.success"), {
    token,
    refreshToken,
  });
});

router.post("/sing-up", accountSingUp, async (req, res) => {
  const { email, password } = req.body;

  const account = await Account.findOne({ where: { email } });
  if (account) {
    return res.jsonBadRequest(null, getMessage("account.signup.email_exists"));
  }

  const hash = bcrypt.hashSync(password, saltRounds);

  const newAccount = await Account.create({
    email,
    password: hash,
  });

  const token = generateJwt({ id: newAccount.id });
  const refreshToken = generateRefreshJwt({ id: newAccount.id });

  return res.jsonOK(newAccount, getMessage("account.signup.success"), {
    token,
    refreshToken,
  });
});

module.exports = router;

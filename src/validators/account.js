const Joi = require("@hapi/joi");
const { getValidatorError } = require("../helpers/validator");

const rules = {
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z-0-9]{6,30}$")),
  password_confirmation: Joi.string().valid(Joi.ref("password")).required(),
};

const options = { abortEarly: false };

const accountSingIn = (req, res, next) => {
  const { email, password } = req.body;
  const shema = Joi.object({
    email: rules.email,
    password: rules.password,
  });

  const { error } = shema.validate({ email, password }, options);

  if (error) {
    const messages = getValidatorError(error, "account.signin");
    return res.jsonBadRequest(null, null, { error: messages });
  }

  next();
};
const accountSingUp = (req, res, next) => {
  const { email, password, password_confirmation } = req.body;
  const shema = Joi.object({
    email: rules.email,
    password: rules.password,
    password_confirmation: rules.password_confirmation,
  });

  const { error } = shema.validate(
    { email, password, password_confirmation },
    options
  );

  if (error) {
    const messages = getValidatorError(error, "account.signup");
    return res.jsonBadRequest(null, null, { error: messages });
  }

  next();
};

module.exports = { accountSingUp, accountSingIn };

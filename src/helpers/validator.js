const { getMessage } = require("../helpers/messages");

const getValidatorError = (error, messagePath) => {
  if (!error) return null;

  const errorMessages = {};
  error.details.map((details) => {
    const message = details.message;
    const type = details.type;
    const key = details.context.key;
    const path = `${messagePath}.${key}.${type}`;

    const customMessage = getMessage(path);
    if (!customMessage) {
      console.log("path", path);
    }
    errorMessages[key] = customMessage || message;
  });

  return errorMessages;
};

module.exports = { getValidatorError };

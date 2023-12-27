const Joi = require("joi");

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};

const validateChangePassword = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    oldPass: Joi.string().required(),
    newPass: Joi.string().required(),
    confirmPass: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = { validateLogin, validateChangePassword };

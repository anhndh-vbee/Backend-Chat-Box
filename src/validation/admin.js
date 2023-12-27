const Joi = require("joi");

const validateAddUser = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  return schema.validate(data);
};

module.exports = { validateAddUser };

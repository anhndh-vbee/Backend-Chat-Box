const Joi = require("joi");

const messageValidate = (data) => {
  const msgSchema = Joi.object({
    userId: Joi.required(),
    question: Joi.string().required(),
  });

  return msgSchema.validate(data);
};

module.exports = messageValidate;

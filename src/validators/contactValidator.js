import Joi from "joi";

const contactValidator = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  message: Joi.string(),
  submittedAt: Joi.date().iso(),
});

export { contactValidator };

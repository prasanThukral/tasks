const Joi = require("joi");

const statusObject = ["OPEN", "INPROGRESS", "CLOSED"];
const taskValidation = Joi.object({
  title: Joi.string().required().max(20),
  status: Joi.string()
    .required()
    .valid(...statusObject),
  description: Joi.string().required().max(200),
  image1name: Joi.string().required().max(200),
  image1url: Joi.string()
    .uri()
    .pattern(/\.(jgp|jpeg|png)$/i),
  image2name: Joi.string().required().max(200),
  image2url: Joi.string()
    .uri()
    .pattern(/\.(jgp|jpeg|png)$/i),
});
const updateValidation = Joi.object({
  status: Joi.string()
    .required()
    .valid(...statusObject),
});
module.exports = { taskValidation, updateValidation };

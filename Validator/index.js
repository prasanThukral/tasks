const { taskValidation, updateValidation } = require("./validator");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const taskValidator = validator(taskValidation);
const updateValidator = validator(updateValidation);

module.exports = { taskValidator, updateValidator };

import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  STAGE: Joi.string().required(),
  MONGO_URL: Joi.string().required(),
  STUDENTS_UPLOAD_DIRECTORY: Joi.string().required(),
});

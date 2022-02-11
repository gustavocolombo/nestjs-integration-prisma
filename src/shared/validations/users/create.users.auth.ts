import { celebrate, Joi } from 'celebrate';

export const createUserAuth = celebrate({
  body: Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(8).required(),
    cellphone: Joi.string().required(),
  }),
});

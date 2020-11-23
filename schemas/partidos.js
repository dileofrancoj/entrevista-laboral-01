const Joi = require("@hapi/joi");
const numbers = Joi.number().positive().required();

const schemas = {
  create: Joi.object().keys({
    golesAFavor: numbers,
    golesEnContra: numbers,
    fecha: Joi.date().required(),
    rival: Joi.string().required(),
    puntos: numbers,
  }),
};

module.exports = { schemas };

const { schemas } = require("./../schemas/partidos");

const create = (req, res, next) => {
  const { error, value } = schemas.create.validate(req.body);
  error ? res.status(422).json({ error: error.details[0].message }) : next();
};

module.exports = { create };

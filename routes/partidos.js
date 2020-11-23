const express = require("express");
const router = express.Router();
const model = require("./../models/partidos");
const middlewares = require("./../middlewares/partidos");
const all = (req, res) =>
  model
    .all()
    .then((response) => res.json(response))
    .catch((e) => res.status(500).json({ message: "Error", e }));

/* last es la función encargada de devolver el último partido  */
const last = (req, res) =>
  model
    .last()
    .then((response) => res.json(response))
    .catch((e) => res.status(500).json({ message: "Error", e }));
const filter = async (req, res) => {
  try {
    const { start, end } = req.query;
    const partidos = await model.findByDate(start, end);
    res.json({ partidos });
  } catch (e) {
    res.status(500).json({ message: "Ocurrió un error", e });
  }
};

const create = (req, res) =>
  model
    .create(req.body)
    .then((response) => res.json(response))
    .catch((e) => res.status(500).json(e));

// if(req.body.golesAFavor != "" && req.body.golesEnContra != "")

router.get("/filter", filter);
router.get("/last", last);
router.get("/all", all);
router.post("/create", middlewares.create, create);

module.exports = router;

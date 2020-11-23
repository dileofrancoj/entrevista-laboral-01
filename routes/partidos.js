const express = require("express");
const router = express.Router();
const model = require("./../models/partidos");
const { route } = require("../app");
// All
// Last
// Fechas
// Puntos acumulados

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

router.get("/filter", filter);
router.get("/last", last);
router.get("/all", all);

module.exports = router;

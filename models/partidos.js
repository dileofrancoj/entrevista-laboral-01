const { pool } = require("./../utils/bd");

// datos de entrada -> validar
const create = async ({ golesAFavor, golesEnContra, fecha, rival, puntos }) =>
  (await pool()).collection("equipo").insertOne({
    golesAFavor,
    golesEnContra,
    fecha: new Date(fecha),
    rival,
    puntos,
  });

// find({conditions},{projections}), sort, limit
// db.collection.find({})
const find = async ({
  conditions = {},
  projection = {},
  sort = {},
  limit = 20,
}) => {
  try {
    return (await pool())
      .collection("equipo")
      .find(conditions, { projection })
      .sort(sort)
      .limit(limit)
      .toArray();
  } catch (error) {
    console.error(error);
  }
};

// localhsot:3000/partidos/filter?start=2020-11-23
const findByDate = (start, end) =>
  find({
    conditions: {
      fecha: {
        $gte: new Date(start), // ISOString
        $lte: new Date(end),
      },
    },
  });
const all = () => find({});
const last = () => find({ sort: { _id: -1 }, limit: 1 });
// find({sort : {_id : -1}})

module.exports = { findByDate, all, last, create };

const { pool } = require("./../utils/bd");

const login = async (usuario, password) => {
  try {
    return (await pool()).collection("usuarios").findOne({ usuario, password });
  } catch (e) {
    console.error(e);
  }
};

module.exports = { login };

const MongoClient = require("mongodb").MongoClient;

const pool = async () => {
  try {
    return (
      await MongoClient.connect(`${process.env.DB_HOST}:${process.env.DB_PORT}`)
    ).db("partidos");
  } catch (e) {
    // log
    console.error(e.stack);
  }
};

module.exports = { pool };

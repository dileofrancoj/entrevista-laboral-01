const MongoClient = require("mongodb").MongoClient;

const pool = async () => {
  try {
    return (await MongoClient.connect("mongodb://localhost:27017/")).db(
      "partidos"
    );
  } catch (e) {
    // log
    console.error(e.stack);
  }
};

module.exports = { pool };

// Passport
// JWT jsonwebtoken
const express = require("express");
const router = express.Router();
const fs = require("fs"); // file system read
const jwt = require("jsonwebtoken");
const sha1 = require("sha1"); // SHA Family
const model = require("./../models/auth");
const signOptions = { expiresIn: "6h", algorithm: "RS256" };
const key = fs.readFileSync("./keys/private.pem");

const createToken = (payload) => jwt.sign(payload, key, signOptions);

const auth = async (req, res) => {
  try {
    const { usuario, password } = req.body;
    const user = await model.login(usuario, sha1(password));
    if (!user) res.status(401).json({ message: "Gatito no autorizado" });
    const { _id } = user;

    const token = createToken({ _id, usuario }); // {_id : ObjectId, usuario : 'francodileo'}
    res.json({ JWT: token });
  } catch (e) {
    console.log(e);
  }
};

// localhost:3000/auth [POST]
router.post("/", auth);

module.exports = router;

var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/authenticate", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then((resultUser) => {
      if (!resultUser) {
        res.end("The user was not found.");
      } else {
        bcrypt.compare(password, resultUser.password).then((resultCompare) => {
          console.log(resultCompare);
          if (!resultCompare) {
            res.end("Authentication failed, wrong password...");
          } else {
            const payload = { username };
            //JWT
            const token = jwt.sign(payload, req.app.get("api_secret_key"), {
              expiresIn: 60,
            }); //1hour;
            res.json({ status: true, token });
            res.end("JWT Create Token");
          }
        });
      }
      //res.json(resultUser)
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
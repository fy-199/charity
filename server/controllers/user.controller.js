const User = require("../models/user.model");
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstname) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Collection
  const { password } = req.body;
  bcrypt.hash(password, 10).then(function (hash) {
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      username: req.body.username,
      password: hash,
      company: req.body.company || null,
      donation: req.body.donation || null,
      phone: req.body.phone || null,
      is_active: req.body.is_active,
      role: req.body.role || "User",
    });
    // Save Customer in the database
    user
      .save(user)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User.",
        });
      });
  });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name
    ? { name: { $regex: new RegExp(storeLocation), $options: "i" } }
    : {};

  User.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

exports.findOne = (req, res) => {
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
              expiresIn: 60000,
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
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. User was not found!`,
        });
      } else res.send({ message: " User was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. User was not found!`,
        });
      } else {
        res.send({ message: " User was deleted successfully!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Could not delete User with id=" + id });
    });
};

exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    });
};

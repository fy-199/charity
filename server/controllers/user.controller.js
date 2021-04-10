const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const mongoose = require("mongoose");
const roles = require("../controllers/role.controller");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.create = (req, res) => {
  // Create a Collection
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    company: req.body.company || null,
    donation: req.body.donation || null,
    phone: req.body.phone || null,
    is_active: req.body.is_active,
    is_deleted: req.body.is_deleted || false,
  });
  // Save Customer in the database
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.findOne({ name: "user" }, (err, role) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      user.roles = [role._id];
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.send({ message: `User was registered successfully!` });
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
      // res.send(data);
      User.aggregate([
        {
          $lookup: {
            from: "roles",
            localField: "roles",
            foreignField: "_id",
            as: "role",
          },
        },
      ])
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.json(err);
        });
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
exports.allAccess = (req, res) => {
  res.render("index");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

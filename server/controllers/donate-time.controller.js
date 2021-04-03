const Time = require("../models/donate-time.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({ message: "Email can not be empty!" });
    return;
  }
  // Create a Collection
  const time = new Time({
    firstname: req.body.firstname || null,
    lastname: req.body.lastname || null,
    email: req.body.email || null,
    phone: req.body.phone || null,
    based_in: req.body.based_in || null,
    interested_in: req.body.interested_in || null,
    comments: req.body.comments || null,
    created_at: req.body.created_at,
    user_id: req.body.user_id || null,
  });
  // Save Time in the database
  time
    .save(time)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Time.",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name
    ? { name: { $regex: new RegExp(storeLocation), $options: "i" } }
    : {};

  Time.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving adresses.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Time.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user",
      },
    },
  ])
    .then((data) => {
      res.json(data);
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
  Time.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Time with id=${id}. Time was not found!`,
        });
      } else res.send({ message: " Time was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Time with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Time.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Time with id=${id}. Time was not found!`,
        });
      } else {
        res.send({ message: " Time was deleted successfully!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Could not delete Time with id=" + id });
    });
};

exports.deleteAll = (req, res) => {
  Time.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Times were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all times.",
      });
    });
};

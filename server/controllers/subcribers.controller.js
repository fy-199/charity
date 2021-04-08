const Subscriber = require("../models/subscribers.model");
const mongoose = require("mongoose");

exports.create = (req, res) => {
  // Create a Collection
  const subscriber = new Subscriber({
    firstname: req.body.firstname || null,
    lastname: req.body.lastname || null,
    email: req.body.email || null,
    created_at: req.body.created_at,
  });
  // Save Subscriber in the database
  subscriber
    .save(subscriber)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Subscriber.",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name
    ? { name: { $regex: new RegExp(storeLocation), $options: "i" } }
    : {};

  Subscriber.find(condition)
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

  Subscriber.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user's information",
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
  Subscriber.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Subscriber with id=${id}. Subscriber was not found!`,
        });
      } else res.send({ message: " Subscriber was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Subscriber with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Subscriber.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Subscriber with id=${id}. Subscriber was not found!`,
        });
      } else {
        res.send({ message: " Subscriber was deleted successfully!" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Could not delete Subscriber with id=" + id });
    });
};

exports.deleteAll = (req, res) => {
  Subscriber.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Subscribers were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all subscribers.",
      });
    });
};

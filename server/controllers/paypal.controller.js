const Paypal = require("../models/paypal.model");
const mongoose = require("mongoose");

exports.create = (req, res) => {
  // Create a Collection
  const paypal = new Paypal({
    firstname: req.body.firstname || null,
    lastname: req.body.lastname || null,
    email: req.body.email || null,
    message: req.body.message || null,
    created_at: req.body.created_at,
  });
  // Save Paypal in the database
  paypal
    .save(paypal)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Paypal.",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name
    ? { name: { $regex: new RegExp(storeLocation), $options: "i" } }
    : {};

  Paypal.find(condition)
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

  Paypal.aggregate([
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
  Paypal.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Paypal with id=${id}. Paypal was not found!`,
        });
      } else res.send({ message: " Paypal was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Paypal with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Paypal.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Paypal with id=${id}. Paypal was not found!`,
        });
      } else {
        res.send({ message: " Paypal was deleted successfully!" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Could not delete Paypal with id=" + id });
    });
};

exports.deleteAll = (req, res) => {
  Paypal.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Paypals were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Paypals.",
      });
    });
};

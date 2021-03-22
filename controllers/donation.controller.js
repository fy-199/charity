const Donation = require("../models/donation.model");
const mongoose = require("mongoose");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstname) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Collection
  const donation = new Donation({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    amount: req.body.amount,
    message: req.body.message,
    donate_type: req.body.donate_type,
    payment_method: req.body.payment_method,
    user_id: req.body.user_id || null,
  });
  // Save Donation in the database
  donation
    .save(donation)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Address.",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name
    ? { name: { $regex: new RegExp(storeLocation), $options: "i" } }
    : {};

  Donation.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving donations.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Donation.aggregate([
    {
      $match: { user_id: mongoose.Types.ObjectId(id) },
    },
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "users",
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
  Donation.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Donation with id=${id}. Donation was not found!`,
        });
      } else res.send({ message: " Donation was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Donation with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Donation.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Donation with id=${id}. Donation was not found!`,
        });
      } else {
        res.send({ message: " Donation was deleted successfully!" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Could not delete Donation with id=" + id });
    });
};

exports.deleteAll = (req, res) => {
  Donation.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Donations were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all donations.",
      });
    });
};
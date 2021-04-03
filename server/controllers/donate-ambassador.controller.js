const Ambassador = require("../models/donate-ambassador.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({ message: "Email can not be empty!" });
    return;
  }
  // Create a Collection
  const ambassador = new Ambassador({
    firstname: req.body.firstname || null,
    lastname: req.body.lastname || null,
    email: req.body.email || null,
    phone: req.body.phone || null,
    based_in: req.body.based_in || null,
    reason_to_join: req.body.reason_to_join || null,
    interest_area: req.body.interest_area || null,
    comments: req.body.comments || null,
    created_at: req.body.created_at,
    user_id: req.body.user_id || null,
  });
  // Save Ambassador in the database
  ambassador
    .save(ambassador)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ambassador.",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name
    ? { name: { $regex: new RegExp(storeLocation), $options: "i" } }
    : {};

  Ambassador.find(condition)
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

  Ambassador.aggregate([
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
  Ambassador.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Ambassador with id=${id}. Ambassador was not found!`,
        });
      } else res.send({ message: " Ambassador was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Ambassador with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Ambassador.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Ambassador with id=${id}. Ambassador was not found!`,
        });
      } else {
        res.send({ message: " Ambassador was deleted successfully!" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Could not delete Ambassador with id=" + id });
    });
};

exports.deleteAll = (req, res) => {
  Ambassador.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Ambassadors were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all ambassadors.",
      });
    });
};

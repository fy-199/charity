const Giftcard = require("../models/donate-giftcard.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");

exports.create = (req, res) => {
  // Create a Collection
  const giftcard = new Giftcard({
    type_of_card: req.body.type_of_card || null,
    card_number: req.body.card_number || null,
    security_code: req.body.security_code || null,
    amount: req.body.amount || null,
    expriration_date: req.body.expriration_date || null,
    post_code: req.body.post_code || null,
    add_info: req.body.add_info || null,
    user_id: req.body.user_id || null,
    created_at: req.body.created_at,
  });
  // Save Giftcard in the database
  giftcard
    .save(giftcard)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Giftcard.",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name
    ? { name: { $regex: new RegExp(storeLocation), $options: "i" } }
    : {};

  Giftcard.find(condition)
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

  Giftcard.aggregate([
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
  Giftcard.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Giftcard with id=${id}. Giftcard was not found!`,
        });
      } else res.send({ message: " Giftcard was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Giftcard with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Giftcard.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Giftcard with id=${id}. Giftcard was not found!`,
        });
      } else {
        res.send({ message: " Giftcard was deleted successfully!" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Could not delete Giftcard with id=" + id });
    });
};

exports.deleteAll = (req, res) => {
  Giftcard.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Giftcards were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all giftcards.",
      });
    });
};

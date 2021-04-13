const InvolvementReq = require("../models/involvement-req.model");
const mongoose = require("mongoose");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.is_active) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Collection
  const involvementReq = new InvolvementReq({
    user_id: req.body.user_id || null,
    involvement_id: req.body.involvement_id || null,
    is_active: req.body.is_active || null,
    is_delete: req.body.is_delete || null,
    updated_at: req.body.updated_at,
    updated_user_id: req.body.user_id || null,
  });
  // Save Address in the database
  involvementReq
    .save(involvementReq)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the InvolvementReq.",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name
    ? { name: { $regex: new RegExp(storeLocation), $options: "i" } }
    : {};

  InvolvementReq.find({ is_deleted: false })
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

  InvolvementReq.findById(id)
    .then((data) => {
      res.send(data);
      InvolvementReq.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user's information",
          },
        },
      ]);
    })
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
  InvolvementReq.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update InvolvementReq with id=${id}. InvolvementReq was not found!`,
        });
      } else res.send({ message: " InvolvementReq was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating InvolvementReq with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  InvolvementReq.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete InvolvementReq with id=${id}. InvolvementReq was not found!`,
        });
      } else {
        res.send({ message: " InvolvementReq was deleted successfully!" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Could not delete InvolvementReq with id=" + id });
    });
};

exports.deleteAll = (req, res) => {
  InvolvementReq.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} InvolvementReq were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all involvementReq.",
      });
    });
};

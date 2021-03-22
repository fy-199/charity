const Involvement = require("../models/involvement.model");
const Media = require("../models/media.model");
const mongoose = require("mongoose");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.address_name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Collection
  const involvement = new Involvement({
    title: req.body.title,
    description: req.body.description || null,
    is_delete: req.body.is_delete || null,
    is_active: req.body.is_active || null,
    type: req.body.type,
    media_id: req.body.media_id || null,
    created_at: req.body.created_at,
  });
  // Save Address in the database
  involvement
    .save(involvement)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Involvement.",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name
    ? { name: { $regex: new RegExp(storeLocation), $options: "i" } }
    : {};

  Involvement.find(condition)
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

  Involvement.aggregate([
    {
      $lookup: {
        from: "medias",
        localField: "media_id",
        foreignField: "_id",
        as: "media",
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
  Involvement.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Involvement with id=${id}. Involvement was not found!`,
        });
      } else res.send({ message: " Involvement was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Involvement with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Involvement.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Involvement with id=${id}. Involvement was not found!`,
        });
      } else {
        res.send({ message: " Involvement was deleted successfully!" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Could not delete Involvement with id=" + id });
    });
};

exports.deleteAll = (req, res) => {
  Involvement.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Involvements were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all involvements.",
      });
    });
};

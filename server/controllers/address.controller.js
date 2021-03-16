const Address = require("../models/address.model");
const User = require("../models/user.model");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstname) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Collection
  const address = new Address({
    address_name: req.body.address_name || null,
    address_title: req.body.address_title || null,
    country: req.body.country || null,
    city: req.body.city || null,
    state: req.body.state || null,
    post_code: req.body.post_code || null,
    address_1: req.body.address_1 || null,
    address_2: req.body.address_2 || null,
    updated_at: req.body.updated_at || null,
  });
  // Save Address in the database
  address
    .save(user)
    .then((data) => {
      const id = req.params.id;
      User.findByIdAndUpdate(
        id,
        { $set: { address: data.id } },
        { useFindAndModify: false }
      )
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Address with id=${id}. Address was not found!`,
            });
          } else res.send({ message: " Address was updated successfully." });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating Address with id=" + id,
          });
        });
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

  Address.find(condition)
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

  Address.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Address with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Address with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  Address.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Address with id=${id}. Address was not found!`,
        });
      } else res.send({ message: " Address was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Address with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Address.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Address with id=${id}. Address was not found!`,
        });
      } else {
        res.send({ message: " Address was deleted successfully!" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Could not delete Address with id=" + id });
    });
};

exports.deleteAll = (req, res) => {
  Address.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Addresses were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all addresses.",
      });
    });
};

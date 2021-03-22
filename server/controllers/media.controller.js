const Media = require("../models/media.model");
// const Post = require("../models/post.model");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Collection
  const media = new Media({
    media_url: req.body.media_url || null,
    title: req.body.title || null,
    is_delete: req.body.is_delete || null,
    media_type: req.body.media_type || null,
    created_at: req.body.created_at,
  });
  // Save Media in the database
  media
    .save(media)
    .then((data) => {
      res.send(data);
      const id = req.body.id;
      Post.findByIdAndUpdate(
        id,
        { $set: { media: data.id } },
        { useFindAndModify: false, new: true }
      )
        .then((data) => {
          res.send(data);
          if (!data) {
            res.status(404).send({
              message: `Cannot update Media with id=${id}. Media was not found!`,
            });
          } else res.send({ message: " Media was updated successfully." });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating Media with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Media.",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name
    ? { name: { $regex: new RegExp(storeLocation), $options: "i" } }
    : {};

  Media.find(condition)
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

  Media.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Media with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Media with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  Media.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Media with id=${id}. Media was not found!`,
        });
      } else res.send({ message: " Media was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Media with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Media.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Media with id=${id}. Media was not found!`,
        });
      } else {
        res.send({ message: " Media was deleted successfully!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Could not delete Media with id=" + id });
    });
};

exports.deleteAll = (req, res) => {
  Media.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Medias were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all medias.",
      });
    });
};

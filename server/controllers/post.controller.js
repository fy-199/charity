const Post = require("../models/post.model");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Collection
  const post = new Post({
    post_img_id: req.body.post_img_id,
    donatee_img_id: req.body.donatee_img_id,
    donatee_desc: req.body.donatee_desc,
    donatee_name: req.body.donatee_name,
    title: req.body.title,
    summary: req.body.summary,
    content: req.body.content,
    media: req.body.media,
    user_id: req.body.user_id || null,
    post_type: req.body.post_type,
  });
  // Save Post in the database
  post
    .save(post)
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

  Post.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving posts.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Post.aggregate([
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
  Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Post with id=${id}. Post was not found!`,
        });
      } else res.send({ message: " Post was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Post with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Post.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Post with id=${id}. Post was not found!`,
        });
      } else {
        res.send({ message: " Post was deleted successfully!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Could not delete Post with id=" + id });
    });
};

exports.deleteAll = (req, res) => {
  Post.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Posts were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all posts.",
      });
    });
};

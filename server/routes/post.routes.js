const posts = require("../controllers/post.controller");
let router = require("express").Router();

router.post("/", posts.create); // Create a new Collection
router.get("/", posts.findAll); // Retrieve all Collections
router.get("/:id", posts.findOne); // Retrieve a single Collection with id
router.put("/:id", posts.update); // Update a Collection with id
router.delete("/:id", posts.delete); // Delete a Collection with id
router.delete("/", posts.deleteAll); // Delete all Collections

module.exports = router;
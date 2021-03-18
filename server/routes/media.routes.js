const medias = require("../controllers/media.controller");
let router = require("express").Router();

router.post("/", medias.create); // Create a new Collection
router.get("/", medias.findAll); // Retrieve all Collections
router.get("/:id", medias.findOne); // Retrieve a single Collection with id
router.put("/:id", medias.update); // Update a Collection with id
router.delete("/:id", medias.delete); // Delete a Collection with id
router.delete("/", medias.deleteAll); // Delete all Collections

module.exports = router;

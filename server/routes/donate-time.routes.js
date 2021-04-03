const times = require("../controllers/donate-time.controller");
let router = require("express").Router();

router.post("/", times.create); // Create a new Collection
router.get("/", times.findAll); // Retrieve all Collections
router.get("/:id", times.findOne); // Retrieve a single Collection with id
router.put("/:id", times.update); // Update a Collection with id
router.delete("/:id", times.delete); // Delete a Collection with id
router.delete("/", times.deleteAll); // Delete all Collections

module.exports = router;

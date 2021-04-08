const subscribers = require("../controllers/subcribers.controller");
let router = require("express").Router();

router.post("/", subscribers.create); // Create a new Collection
router.get("/", subscribers.findAll); // Retrieve all Collections
router.get("/:id", subscribers.findOne); // Retrieve a single Collection with id
router.put("/:id", subscribers.update); // Update a Collection with id
router.delete("/:id", subscribers.delete); // Delete a Collection with id
router.delete("/", subscribers.deleteAll); // Delete all Collections

module.exports = router;

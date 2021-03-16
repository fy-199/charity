const adresses = require("../controllers/address.controller");
let router = require("express").Router();

router.post("/", adresses.create); // Create a new Collection
router.get("/", adresses.findAll); // Retrieve all Collections
router.get("/:id", adresses.findOne); // Retrieve a single Collection with id
router.put("/:id", adresses.update); // Update a Collection with id
router.delete("/:id", adresses.delete); // Delete a Collection with id
router.delete("/", adresses.deleteAll); // Delete all Collections

module.exports = router;

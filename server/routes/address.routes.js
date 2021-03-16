const addresses = require("../controllers/address.controller");
let router = require("express").Router();

router.post("/", addresses.create); // Create a new Collection
router.get("/", addresses.findAll); // Retrieve all Collections
router.get("/:id", addresses.findOne); // Retrieve a single Collection with id
router.put("/:id", addresses.update); // Update a Collection with id
router.delete("/:id", addresses.delete); // Delete a Collection with id
router.delete("/", addresses.deleteAll); // Delete all Collections

module.exports = router;

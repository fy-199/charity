const paypal = require("../controllers/paypal.controller");
let router = require("express").Router();

router.post("/", paypal.create); // Create a new Collection
router.get("/", paypal.findAll); // Retrieve all Collections
router.get("/:id", paypal.findOne); // Retrieve a single Collection with id
router.put("/:id", paypal.update); // Update a Collection with id
router.delete("/:id", paypal.delete); // Delete a Collection with id
router.delete("/", paypal.deleteAll); // Delete all Collections

module.exports = router;

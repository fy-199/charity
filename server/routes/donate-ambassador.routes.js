const ambassadors = require("../controllers/donate-ambassador.controller");
let router = require("express").Router();

router.post("/", ambassadors.create); // Create a new Collection
router.get("/", ambassadors.findAll); // Retrieve all Collections
router.get("/:id", ambassadors.findOne); // Retrieve a single Collection with id
router.put("/:id", ambassadors.update); // Update a Collection with id
router.delete("/:id", ambassadors.delete); // Delete a Collection with id
router.delete("/", ambassadors.deleteAll); // Delete all Collections

module.exports = router;

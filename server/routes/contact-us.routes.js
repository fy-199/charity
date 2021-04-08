const contactus = require("../controllers/contact-us.controller");
let router = require("express").Router();

router.post("/", contactus.create); // Create a new Collection
router.get("/", contactus.findAll); // Retrieve all Collections
router.get("/:id", contactus.findOne); // Retrieve a single Collection with id
router.put("/:id", contactus.update); // Update a Collection with id
router.delete("/:id", contactus.delete); // Delete a Collection with id
router.delete("/", contactus.deleteAll); // Delete all Collections

module.exports = router;

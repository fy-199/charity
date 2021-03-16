const users = require("../controllers/user.controller");
let router = require("express").Router();

router.post("/", users.create); // Create a new Collection
router.get("/", users.findAll); // Retrieve all Collections
router.get("/:id", users.findOne); // Retrieve a single Collection with id
router.put("/:id", users.update); // Update a Collection with id
router.delete("/:id", users.delete); // Delete a Collection with id
router.delete("/", users.deleteAll); // Delete all Collections

module.exports = router;

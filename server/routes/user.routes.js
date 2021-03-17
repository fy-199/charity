const users = require("../controllers/user.controller");
let router = require("express").Router();

router.post("/", users.create); // Create a new User
router.get("/", users.findAll); // Retrieve all Users
router.get("/:id", users.findOne); // Retrieve a single User with id
router.put("/:id", users.update); // Update a User with id
router.delete("/:id", users.delete); // Delete a User with id
router.delete("/", users.deleteAll); // Delete all Users

module.exports = router;

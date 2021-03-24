const involvements = require("../controllers/involvement.controller");
let router = require("express").Router();

router.post("/", involvements.create); // Create a new involvement
router.get("/", involvements.findAll); // Retrieve all involvements
router.get("/:id", involvements.findOne); // Retrieve a single involvement with id
router.put("/:id", involvements.update); // Update a involvement with id
router.delete("/:id", involvements.delete); // Delete a involvement with id
router.delete("/", involvements.deleteAll); // Delete all involvements

module.exports = router;
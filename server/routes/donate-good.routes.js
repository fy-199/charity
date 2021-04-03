const goods = require("../controllers/donate-good.controller");
let router = require("express").Router();

router.post("/", goods.create); // Create a new Collection
router.get("/", goods.findAll); // Retrieve all Collections
router.get("/:id", goods.findOne); // Retrieve a single Collection with id
router.put("/:id", goods.update); // Update a Collection with id
router.delete("/:id", goods.delete); // Delete a Collection with id
router.delete("/", goods.deleteAll); // Delete all Collections

module.exports = router;

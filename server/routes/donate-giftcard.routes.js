const giftcards = require("../controllers/donate-giftcard.controller");
let router = require("express").Router();

router.post("/", giftcards.create); // Create a new Collection
router.get("/", giftcards.findAll); // Retrieve all Collections
router.get("/:id", giftcards.findOne); // Retrieve a single Collection with id
router.put("/:id", giftcards.update); // Update a Collection with id
router.delete("/:id", giftcards.delete); // Delete a Collection with id
router.delete("/", giftcards.deleteAll); // Delete all Collections

module.exports = router;

const donations = require("../controllers/donation.controller");
let router = require("express").Router();

router.post("/", donations.create); // Create a new donation
router.get("/", donations.findAll); // Retrieve all donations
router.get("/:id", donations.findOne); // Retrieve a single donation with id
router.put("/:id", donations.update); // Update a donation with id
router.delete("/:id", donations.delete); // Delete a donation with id
router.delete("/", donations.deleteAll); // Delete all donations

module.exports = router;

const involvementsReq = require("../controllers/involvement-req.controller");
let router = require("express").Router();

router.post("/", involvementsReq.create); // Create a new involvement
router.get("/", involvementsReq.findAll); // Retrieve all involvementsReq
router.get("/:id", involvementsReq.findOne); // Retrieve a single involvement with id
router.put("/:id", involvementsReq.update); // Update a involvement with id
router.delete("/:id", involvementsReq.delete); // Delete a involvement with id
router.delete("/", involvementsReq.deleteAll); // Delete all involvementsReq

module.exports = router;

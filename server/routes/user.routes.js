const users = require("../controllers/user.controller");
let router = require("express").Router();
const { verifyToken } = require("../middlewares");

// router.post("/", users.create); // Create a new User
router.get("/info/:id", users.findOneUser); // Retrieve a single User with id
router.get("/:id", users.findOne); // Retrieve a single User with id
router.get("/", users.findAll); // Retrieve all Users
router.put("/:id", users.update); // Update a User with id
router.delete("/:id", users.delete); // Delete a User with id
// router.get("/auth/all", users.allAccess);
router.get("/auth/user", [verifyToken.verifyToken], users.userBoard);
router.get(
  "/auth/mod",
  [verifyToken.verifyToken, verifyToken.isModerator],
  users.moderatorBoard
);
router.get(
  "/auth/admin",
  [verifyToken.verifyToken, verifyToken.isAdmin],
  users.adminBoard
);

module.exports = router;

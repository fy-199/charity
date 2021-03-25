let router = require("express").Router();
const { verifySignUp } = require("../middlewares");
const auth = require("../controllers/auth.controller");
const users = require("../controllers/user.controller");
const roles = require("../controllers/role.controller");

router.post(
  "/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  users.create
);

router.post("/signin", auth.signin);
router.get("/", users.allAccess);

module.exports = router;

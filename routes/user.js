const express = require("express");
const UserController = require("../components/users/UserController");
const router = express.Router();
const Auth = require("../middlewares/Auth");
const { authentication, authorization } = Auth;

router.post("/", UserController.login);
router.get("/all", [authentication, authorization], UserController.getMember);

module.exports = router;

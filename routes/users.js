var express = require("express");
const passport = require("passport");
var router = express.Router();
const userController = require("../controllers/user.controller");
const {authLogin, authNotLogin} = require('../middlewares/auth.mdw');

/* GET home page. */
router.get("/", userController.getAccountInfo);

router.get("/login",authNotLogin, userController.login);

router.post(
  "/login",authNotLogin,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/register",authNotLogin, userController.register);

router.post("/register",authNotLogin, userController.addNewAccount);

router.get("/logout", userController.logout);

router.get("/vertify", userController.vertify)

module.exports = router;

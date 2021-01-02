var express = require("express");
const passport = require("passport");
var router = express.Router();
const userController = require("../controllers/user.controller");
const { authLogin, authNotLogin } = require('../middlewares/auth.mdw');

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.isAuthenticated) {
    next()
  } else {
    res.render('user/login')
  }
}, userController.getAccountInfo);

router.get("/login", authNotLogin, userController.login);
router.post("/login", authNotLogin, passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
})
);

router.get("/register", authNotLogin, userController.register);
router.post("/register", authNotLogin, userController.addNewAccount);

router.get("/logout", userController.logout);

router.get("/verify", userController.verifyEmail);

router.get("/forgot-password", userController.renderForgotPasswordScreen)
router.post("/forgot-password", userController.sendEmailResetPassword)

router.get("/reset-password", userController.renderNewPasswordScreen)
router.post("/reset-password", userController.resetPassword)

module.exports = router;
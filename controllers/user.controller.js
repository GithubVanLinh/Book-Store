const userModel = require("../models/user.model");
const userService = require("../service/user-service")

module.exports = {
  getAccountInfo: (req, res, next) =>
    res.render("user/my-account", { title: "Express" }),

  checkLogin: async (req, res, next) => {
    const password = req.body.password;
    const email = req.body.email;
    console.log(email);
    console.log(password);

    const loginStatus = await userModel.login(email, password);
    console.log("checkLogin", "loginStatus", loginStatus);
    if (loginStatus === 1) {
      res.redirect("/");
    } else {
      res.render("user/login", { error: true });
    }
  },

  login: (req, res, next) => {
    res.render("user/login");
  },

  register: (req, res, next) => res.render("user/register"),

  addNewAccount: async (req, res, next) => {
    const userInfo = req.body;
    const result = await userModel.addNewAccount(userInfo);
    switch (result.status) {
      case 1:
        res.send("Please confirm email!");
        break;
      case -1:
        res.render("user/register", { message: result.err })
        break;
      default:
        res.redirect("/register");
    }
  },

  logout: (req, res, next) => {
    req.logout();
    res.redirect("/");
  },

  verifyEmail: async (req, res, next) => {
    const id = req.query.id;
    const email = req.query.email;
    // console.log("vertify", "id", id);
    const result = await userModel.verifyEmail(email, id);

    let message = ""
    if (result) {
      message = "Verify email successfully!"
    } else {
      message = "Something went wrong. Verify email failed!"
    }
    res.render('user/verify', { message })
  },

  renderForgotPasswordScreen: (req, res, next) => {
    res.render('user/forgot-password')
  },

  sendEmailResetPassword: async (req, res, next) => {
    //send email
    const email = req.body.email;

    const userInfo = await userModel.getActivedUserByEmail(email);
    if (userInfo) {
      const result = await userService.sendEmailResetPassword(userInfo)
      if (result) {
        res.send("Email has sent")
      } else {
        res.render('user/forgot-password', { message: "Error while sending email" })
      }
    } else {
      res.render('user/forgot-password', { message: "Email does not exist" })
    }
  },

  renderNewPasswordScreen: async (req, res, next) => {
    // const email = req.query.email;
    const id = req.query.id;

    const result = await userModel.getActivedUserInfo(id);
    // console.log(result);

    if (result) {
      res.render('user/reset-password', { id })
    }
    else {
      next()
    }
  },

  resetPassword: async (req, res, next) => {
    const { userId, password } = req.body;
    // const userInfo = await userModel.getActivedUserInfo(userId);

    if (await userModel.getActivedUserInfo(userId)) {
      if (await userModel.changePassword(userId, password)) {
        res.render('user/login');
      }
    }
    res.render('user/reset-password', { message: "Change password failed" })
  },

  updateUserInfo: async (req, res, next) => {
    const newUserInfo = { ...req.body };
    const result = await userModel.updateUserInfo(req.user._id, newUserInfo);
    // res.render("user/my-account", { message: result.message });
    res.redirect('/users')
  },

  changePassword: async (req, res, next) => {
    const { current_password, new_password } = req.body;
    if (new_password.trim()) {
      if (await userService.checkCredential(req.user.email, current_password)) {
        const result = await userModel.changePassword(req.user._id, new_password);
      }
    }
    res.redirect('/users')
  }

};

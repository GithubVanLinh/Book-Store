const userModel = require("../models/user.model");
const vertifyModel = require("../models/vertify.model");

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
    const result = await userModel.vertify(email, id);

    let message = ""
    if(result) {
      message = "Verify email successfully!"
    } else {
      message = "Something went wrong. Verify email failed!"
    }
    res.render('user/verify', {message})
  },
};

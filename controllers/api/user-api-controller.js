const userService = require("../../service/user-service")
const userModel = require("../../models/user.model");

exports.checkEmailExist = async (req, res, next) => {
  const email = req.query.email;
  const result = await userService.checkEmailExists(email);
  res.json(result);
}

exports.updateUserInfo = async (req, res, next) => {
  const newUserInfo = { ...req.body };
  const result = await userModel.updateUserInfo(req.user._id, newUserInfo);
  // res.render("user/my-account", { message: result.message });
  res.json(result);
}

exports.changePassword = async (req, res, next) => {
  const { current_password, new_password } = req.body;
  let result = {status: false, message: "Change password failed"};

  if (await userService.checkCredential(req.user.email, current_password)) {
    if(await userModel.changePassword(req.user._id, new_password)){
      result.status = true;
      result.message = "Password was changed";
    }
  } else {
    result.message = "Current password is not correct"
  }
  res.json(result);
}
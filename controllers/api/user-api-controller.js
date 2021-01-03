const userService = require("../../service/user-service")

exports.checkEmailExist = async (req, res, next) => {
  const email = req.query.email;
  const result = await userService.checkEmailExists(email);
  res.json(result);
}
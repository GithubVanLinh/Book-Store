const userService = require("../../service/user-service")
const userModel = require("../../models/user.model");

exports.addBookToCart = async (req, res, next) => {
  const bookId = req.body.bookId;
  const amount = parseInt(req.body.amount);
  let result = {};

  if (req.isAuthenticated()) {
    result = await userModel.addBookToCart(req.user._id, { bookId, amount });
    result.isAuthenticated = true;
  } else {
    let isExists = false;
    if (!req.session.cart) {
      req.session.cart = [];
    }
    for (let goods of req.session.cart) {
      if (goods.bookId === bookId) {
        isExists = true;
        goods.amount += amount;
        break;
      }
    }
    if (!isExists) {
      req.session.cart.push({ bookId, amount });
    }

    result.isAuthenticated = false;
    result.cart = req.session.cart;
  }

  res.json(result);
}
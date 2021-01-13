// const userService = require("../../service/user-service")
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

exports.changeAmount = async (req, res, next) => {
  const bookId = req.body.bookId;
  const amount = parseInt(req.body.amount);
  let result = {};

  // console.log(bookId, amount)
  if (req.isAuthenticated()) {
    result = await userModel.updateGoodsAmount(req.user._id, { bookId, amount })
  } else {
  //   //update req.session.cart
  //   // if (!req.session.cart) {
  //   //   req.session.cart = []
  //   // }
  //   for (let goods of req.session.cart) {
  //     if (goods.bookId === bookId) {
  //       goods.amount = amount;
  //       break;
  //     }
  //   }

  //   const cart = [...req.session.cart];

  //   let ids = [];
  //   for (const goods of cart) {
  //     ids.push(goods.bookId);
  //   }

  //   const books = await bookModel.getBooksByIds(ids)
  //   // let data = { cart: [], totalPrice: 0 }
  //   if (books) {
  //     let totalPrice = 0;
  //     for (let i = 0; i < books.length; i++) {
  //       cart[i].bookId = books[i];
  //       totalPrice += books[i].price * cart[i].amount;
  //     }

  //     result.status = true;
  //     result.data = { cart, totalPrice }
  //   }


  //   result.status = true;
  //   result.totalPri

  }
  res.json(result);
}
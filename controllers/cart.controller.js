const userModel = require('../models/user.model')
const bookModel = require('../models/book.model')


module.exports = {
  getCart: async (req, res, next) => {
    if (req.isAuthenticated()) {
      const result = await userModel.getCartDetail(req.user._id);
      res.render('cart/cart', result);

    } else {
      const result = { status: false, message: "" }

      if (!req.session.cart) {
        req.session.cart = []
      }
      // let cart = [...req.session.cart];
      let cart = [];
      for (let i = 0; i < req.session.cart.length; i++) {
        cart.push({ ...req.session.cart[i] })
      }
      let ids = [];
      for (const goods of cart) {
        ids.push(goods.bookId);
      }

      const books = await bookModel.getBooksByIds(ids);
      // let data = { cart: [], totalPrice: 0 }
      if (books) {
        let totalPrice = 0;
        for (let i = 0; i < books.length; i++) {
          cart[i].bookId = books[i];
          totalPrice += books[i].price * cart[i].amount;
        }

        result.status = true;
        result.data = { cart, totalPrice };
      }
      // cart = ['1', '2', '3'];
      // result = { status: true, message: "", data: { cart, totalPrice } }

      console.log("cart: ", cart);
      console.log("req.session.cart: ", req.session.cart);
      res.render('cart/cart', result);
      // res.send(books);
    }
  },
  checkout: (req, res, next) => res.render('cart/checkout'),
  wishlist: (req, res, next) => res.render('cart/wishlist'),
}
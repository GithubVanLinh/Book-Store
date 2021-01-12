
module.exports = {
  getCart: (req, res, next) => {
    // res.send("cart")
    // if (req.isAuthenticated()) {
    //   res.send("authenticated")
    // } else {
      console.log("Session.cart: ", req.session.cart)
      res.render('cart/cart', req.session.cart);
    // }
  },
  checkout: (req, res, next) => res.render('cart/checkout'),
  wishlist: (req, res, next) => res.render('cart/wishlist'),
}
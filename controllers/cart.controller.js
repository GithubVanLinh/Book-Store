module.exports ={
    getCart: (req, res, next) => res.render('cart/cart'),
    checkout: (req, res, next) => res.render('cart/checkout'),
    wishlist: (req, res, next) => res.render('cart/wishlist'),
}
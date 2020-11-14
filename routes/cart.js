var express = require('express');
var router = express.Router();
const CartController = require('../controllers/cart.controller');

/* GET home page. */
router.get('/', CartController.getCart)

router.get('/checkout', CartController.checkout);

router.get('/wishlist', CartController.wishlist);
module.exports = router;

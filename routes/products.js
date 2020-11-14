var express = require('express');
var router = express.Router();
const ProductController = require('../controllers/product.controller');



/* GET home page. */
router.get('/', ProductController.getProductList);

/* GET home page. */
router.get('/:id/detail', ProductController.getProductById);

module.exports = router;

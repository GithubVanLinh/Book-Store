var express = require('express');
var router = express.Router();
const BookController = require('../controllers/book.controller');



/* GET home page. */
router.get('/', BookController.getBookList);

/* GET home page. */
router.get('/:id/detail', BookController.getBookById);

router.post('/:id/comments', BookController.createComment);

// router.get('/search', BookController.searchBooks);
module.exports = router;

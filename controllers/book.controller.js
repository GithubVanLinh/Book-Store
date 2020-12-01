const BookModel = require("../models/book.model");

module.exports = {
  getBookList: (req, res, next) => {
    // console.log(ProductModel.get());
    const bookData = BookModel.getAllBook();
    res.render("book/book-list", { book:  bookData});
  },
  getBookById: (req, res, next) => {
      const id = req.params.id;
    //   console.log(id);
      const book = BookModel.getProductById(id);
      console.log(book);
    res.render("book/book-detail", { book});
  },
};

const BookModel = require("../models/book.model");

module.exports = {
  getBookList: async(req, res, next) => {
    // console.log(ProductModel.get());
    console.log("get data...");
    const bookData =await BookModel.getAllBook();
    console.log("get success, Data is: ", bookData);
    res.render("book/book-list", { bookList:  bookData});
  },
  getBookById: async(req, res, next) => {
      const id = req.params.id;
      console.log(id);
      const book =await BookModel.getBookById(id);
      console.log(book);
    res.render("book/book-detail", { book});
  },
};

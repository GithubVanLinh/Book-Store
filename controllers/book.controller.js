const BookModel = require("../models/book.model");

module.exports = {
  getBookList: async(req, res, next) => {
    // console.log(ProductModel.get());
    const filter = {};
    console.log(req.query.page);
    filter.page = +req.query.page || 1;
    console.log("filter", filter);

    console.log("get data...");
    const bookData =await BookModel.getAllBook(filter);
    console.log("get success, Data is: ", bookData.docs);

    bookData.bookList = bookData.docs;

    res.render("book/book-list", bookData);
  },
  getBookById: async(req, res, next) => {
      const id = req.params.id;
      console.log(id);
      const book =await BookModel.getBookById(id);
      console.log(book);
    res.render("book/book-detail", { book});
  },
};

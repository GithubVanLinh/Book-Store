const BookModel = require("../models/book.model");
const CategoryModel = require("../models/category.model");

module.exports = {
  getBookList: async(req, res, next) => {
    // console.log(ProductModel.get());
    const filter = {};
    console.log(req.query.page);
    filter.page = +req.query.page || 1;
    filter.category = req.query.category;
    console.log("filter", filter);

    console.log("get data...");
    const bookData =await BookModel.getAllBook(filter);
    console.log("get success, Data is: ", bookData.docs);

    bookData.bookList = bookData.docs;
    bookData.category = filter.category;

    bookData.categorys = await CategoryModel.getCategoryList();

    console.log("locals", req.locals);
    console.log("locals", req.session);
    res.render("book/book-list", bookData);
  },
  getBookById: async(req, res, next) => {
      const id = req.params.id;
      console.log(id);
      const book =await BookModel.getBookById(id);
      console.log(book);
    res.render("book/book-detail", { book});
  },
   searchBooks: async (req, res, next) => {
    let page = +req.query.page || 1;

    // const keyword = Search.removeAccents(req.query.keyword);
    const keyword = req.query.keyword;
    const bookData = await BookModel.searchBooks(keyword, page);
    // res.send(results);
    bookData.bookList = bookData.docs;
    // bookData.category = category;
    bookData.keyword = keyword;

    // bookData.categories = await CategoryModel.getCategoryList();
    res.render("./book/book-list", bookData);
    // res.send(bookData);

  },
};
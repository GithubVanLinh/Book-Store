const BookModel = require("../models/book.model");
const CategoryModel = require("../models/category.model");
const Comment = require("../databases/comment");

module.exports = {
  getBookList: async (req, res, next) => {
    // console.log(ProductModel.get());
    const filter = {};
    console.log(req.query.page);
    filter.page = +req.query.page || 1;
    filter.category = req.query.category;
    filter.keyword = req.query.keyword;
    console.log("filter", filter);

    console.log("get data...");
    const bookData = await BookModel.getAllBook(filter);
    console.log("get success, Data is: ", bookData.docs);

    bookData.bookList = bookData.docs;
    bookData.category = filter.category;

    bookData.categorys = await CategoryModel.getCategoryList();
    bookData.oldQuery = req.query;

    //console.log("locals", req.locals);
    //console.log("locals", req.session);
    console.log("query", req.query);
    res.render("book/book-list", bookData);
  },
  getBookById: async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    //increase views by 1

    // const book = await BookModel.getBookById(id);
    // console.log(book);
    const book = await BookModel.getBookDetail(id);
    const bookData = await BookModel.getAllBook({ category: book.category[0]._id });

    const relatedBooks = bookData.docs;
    // remove element equal book in relatedBooks
    // let index = -1;
    // for (let i = 0; i < relatedBooks.length; i++) {
    //   if (relatedBooks[i]._id === book._id) {
    //     console.log("euqual: ", relatedBooks[i]._id)
    //     index = i;
    //     break;
    //   }
    // }

    // if(index !== -1) {
    //   relatedBooks.splice(index, 1);
    // }

    // res.send(relatedBooks);
    res.render("book/book-detail", { book, relatedBooks });
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

  createComment: async (req, res, next) => {
    const id = req.params.id;
    const book = await BookModel.getBookById(id);
    console.log(book);
    book.comments = [...book.comments, req.body];
    await book.save();
    res.json({ book });
  }
};

const Book = require("../databases/book");
const Author = require("../databases/author");
const Category = require("../databases/category");
const mongoose = require("mongoose");

const LIMIT = 2;

//True if exists
async function CheckBookExists(bookId) {
  console.log("book Id: ", bookId);
  const isBookExists = await Book.exists({ id: bookId });
  return isBookExists;
}

async function find_idByid(bookId) {
  console.log("book Id: ", bookId);
  const book = await Book.find({ id: id });
  return book._id;
}

//return id if exists
async function validateAuthor(authorId) {
  const id = mongoose.Types.ObjectId(authorId);
  const isExists = await Author.exists({ _id: id });
  if (isExists) {
    console.log("author is valided");
    return id;
  } else {
    return -1;
  }
}

async function validateCategory(categoryId) {
  const id = mongoose.Types.ObjectId(categoryId);
  const isExists = await Category.exists({ _id: id });
  if (isExists) {
    return id;
  } else {
    return -1;
  }
}

async function validateBookInfo(bookInfo) {
  console.log("validate BookInfo ", bookInfo);
  const newBook = bookInfo;

  //start add author id to newBook
  //check author exists
  //return author id if valid
  console.log("validate author");
  const authorId = await validateAuthor(bookInfo.author);
  if (authorId === -1) {
    return -1;
  }
  newBook.author = authorId;
  //end author

  //begin add category to newBook
  //check category exists
  //return categoryId if valid
  const categoryArray = bookInfo.category;
  const category = [];

  for (i of categoryArray) {
    const categoryId = await validateCategory(i);
    if (categoryId === -1) {
      return -1;
    }
    category.push(categoryId);
  }
  newBook.category = category;
  //end category

  console.log("new Book: ", newBook);

  return newBook;
}

module.exports = {
  getAllBook: async(filter) => {
    const query = { show: true };
    const options = {
      populate: ["author", "category"],
      page: filter.page,
      limit: LIMIT
    };
    console.log("pre", options);
    let books;
    await Book.paginate(query, options)
    .then(function (result) {
      console.log("result", result);
      books = result
    });
    return books;
  },
  getBookById: async (_id) => {
    const books = await Book.findOne({ _id: _id, show: true })
      .populate("author")
      .populate("category")
      .exec();
    console.log(books);
    return books;
  },
  // return -1 if ID has been existed
  createANewBook: async (aNewBookInfo) => {
    console.log("Book info", aNewBookInfo);

    //check book exists
    const isBookExists = await CheckBookExists(aNewBookInfo.id);
    if (isBookExists) {
      return -1;
    }

    const aBook = await validateBookInfo(aNewBookInfo);
    if (aBook === -1) {
      return -1;
    }
    console.log("book is valid");

    console.log("book is creating");
    const bookDataRes = await Book.create(aBook);
    console.log("book is created");
    console.log(bookDataRes);
    return bookDataRes;
  },

  updateABook: async (bookInfo) => {
    try {
      //check book exists
      const isBookExists = await CheckBookExists(bookInfo.id);
      if (!isBookExists) {
        return -1;
      }
      const aBook = await validateBookInfo(bookInfo);
      if (aBook === -1) {
        return -1;
      }
      console.log("book is valid");

      console.log("book is updating");
      if (!aBook._id) {
        console.log("_id is required");
      }
      const bookDataRes = await Book.findByIdAndUpdate(aBook._id, aBook);
      console.log("book is updated");
      console.log(bookDataRes);
      return bookDataRes;
    } catch (error) {
      console.log("something went wrong!");
      console.log(error);
      return -1;
    }
  },

  deleteABook: async (id) => {
    try {
      const res = await Book.findByIdAndUpdate(id, { show: false });
      return res;
    } catch (error) {
      console.log("wrong");
      return -1;
    }
  },
};

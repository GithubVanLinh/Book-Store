const mongoose = require("mongoose");
const Comment = require("./comment");
const Author = require("./author")
const Category = require("./category");
const { Schema } = mongoose;

async function getFullAuthor(v) {
  return await Author.findById(v);
}

const BookSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name:  {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: String,
  views: {
    type: Number,
    default: 0
  },
  quantity_sold: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    default: 0
  },
  author: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: Author
  },
  price: {
    type: Number,
    default: 0
  },
  publisher: String,
  desciption: String,
  comments: [{
    type: mongoose.Types.ObjectId,
    ref: Comment
  }],
  category: [{
    type: mongoose.Types.ObjectId,
    ref: Category
  }]
});




module.exports = mongoose.model("Book", BookSchema);

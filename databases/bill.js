const mongoose = require("mongoose");
const Book = require("./book");
const User = require("./user");
const { Schema } = mongoose;

const BillSchema = new Schema({
  id: String,
  book: Book,
  amount: Number,
  total_price: Number,
  day_trading: Date,
  user: User,
  show: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Bill", BillSchema);

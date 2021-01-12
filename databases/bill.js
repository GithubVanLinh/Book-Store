const mongoose = require("mongoose");
const Book = require("./book");
const User = require("./user");
const { Schema } = mongoose;

const BillSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: User
  },
  books: [
    {
      bookId: {
        type: mongoose.Types.ObjectId,
        ref: Book
      },
      count: Number
    }
  ],
  delivery_address: String,
  booking_date: {
    type: Date,
    default: Date.now()
  },
  update_date: Date,
  total_price: Number,
  status: {
    type: String,
    default: "Pending"
  },
  show: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Bill", BillSchema);

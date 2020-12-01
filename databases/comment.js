const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema({
  bookId: {
    type: String,
    required: true
  },
  
  userId: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Comment", CommentSchema);

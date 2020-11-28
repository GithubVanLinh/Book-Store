const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema({
  id: String,
  name: String,
  description: String
});

module.exports = mongoose.model("Category", CategorySchema);

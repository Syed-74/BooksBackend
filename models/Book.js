const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  bookName: String,
  authorName: String,
  category: String,
  image: String,
  pdf: String,
});

module.exports = mongoose.model("Book", BookSchema);


// modelle ilişki routes tarafında kurulur
const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    //title,timeStamps
    title: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("categories", CategorySchema); //mongoDb'deki tablo adı:categories
module.exports = Category;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
  name: { type: String, required: true },
  image_Url: { type: String },
});

module.exports = mongoose.model("Categories", CategoriesSchema);

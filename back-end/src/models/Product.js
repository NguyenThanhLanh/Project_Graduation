const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  discount_price: { type: Number },
  image_Url: [{ type: String }],
  quantity: { type: Number, default: 0 },
  category: { type: String },
  suppiler: { type: String },
  total_sell: { type: Number, default: 0 },
});

module.exports = mongoose.model("Product", ProductSchema);

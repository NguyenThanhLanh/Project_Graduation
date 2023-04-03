const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
  name: {type: String, require: true},
  description: { type: String, require: true },
  price: { type: Number, require: true },
  image: { type: String, require: true },
  quantity: { type: Number, default: 0},
  productTypeId: { type: ObjectId, ref: 'ProductType' },
  suppilerId: { type: ObjectId, ref: 'Suppiler' },
});

module.exports = mongoose.model('Product', ProductSchema);
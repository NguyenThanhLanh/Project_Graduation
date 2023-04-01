const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
  name: {type: String, require: true},
  description: { type: String, require: true },
  price: { type: Number, require: true },
  image: { type: String, require: true },
  productType_id: { type: ObjectId, ref: 'ProductType' },
  comment_ids: { type: [ObjectId], ref: 'Comment'},
  suppiler_id: { type: ObjectId, ref: 'Suppiler' },
  quantity: { type: Number, default: 0},
});

module.exports = mongoose.model('Product', ProductSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const CartSchema = new Schema({
    user: { type: ObjectId, ref: 'User' },
    product_ids: { type: [ObjectId], ref: 'Product'}
});

module.exports = mongoose.model('Cart', CartSchema);
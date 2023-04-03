const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const CartSchema = new Schema({
    user: { type: ObjectId, ref: 'User' },
    products: [
        {
            productId: { type: ObjectId, ref: 'Product'},
            quantity: { type: Number, require: true},
            price: { type: Number, require: true}
        }
    ]
});

module.exports = mongoose.model('Cart', CartSchema);
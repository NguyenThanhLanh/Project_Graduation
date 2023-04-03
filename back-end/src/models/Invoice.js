const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const InvoiceSchema = new Schema({
    userId: { type: ObjectId, ref: 'User'},
    date: { type: Date, required: true , default: Date.now()},
    products: [
        {
            productId: { type: ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ]
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
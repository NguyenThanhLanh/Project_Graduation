const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const InvoiceSchema = new Schema({
    invoiceNumber: { type: String, required: true },
    date: { type: Date, required: true , default: Date.now()},
    user: { type: ObjectId, ref: 'User'},
    totalPrice: { type: Number, require: true, default: 0}
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
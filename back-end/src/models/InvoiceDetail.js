/*
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const InvoiceDetailSchema = Schema({
    invoiceId: { type: ObjectId, ref: 'Invoice', require: true },
    productId: { type: ObjectId, ref: 'Product', require: true},
    quantity: { type: Number, require: true },
    price: { type: Number, require: true}
});

module.exports = mongoose.model('InvoiceDetail', InvoiceDetailSchema);
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const InvoiceDetailSchema = Schema({
    invoiceId: { type: ObjectId, ref: 'Invoice', index: true },
    product_ids: { type: [ObjectId], ref: 'Product'},
    quantity: { type: Number, default: 0 },
});

module.exports = mongoose.model('InvoiceDetail', InvoiceDetailSchema);
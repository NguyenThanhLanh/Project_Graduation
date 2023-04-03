const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const CommentSchema = new Schema({
    userId: { type: ObjectId, ref: 'User', require: true},
    productId: { type: ObjectId, ref: 'Product', require: true},
    comment: { type: String, require: true},
});

module.exports = mongoose.model('Comment', CommentSchema)
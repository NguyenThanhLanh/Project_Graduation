const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = new Schema.ObjectId;

const CommentSchema = new Schema({
    user: { type: ObjectId, ref: 'User', require: true},
    product: { type: ObjectId, ref: 'Product', require: true},
    comment: { type: String, require: true},
});

module.exports = mongoose.model('Comment', CommentSchema)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const SuppilerSchema = new Schema({
    name: { type: String, require: true},
    address: { type: String, require: true},
    phone: { type: String, require: true, unique: true},
    email: { type: String, require: true, unique: true},
});

module.exports = mongoose.model('Suppiler', SuppilerSchema)
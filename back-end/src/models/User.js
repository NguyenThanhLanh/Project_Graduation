const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = new Schema.ObjectId;

const UserSchema = new Schema({
    name: { type: String, required: true , unique: true},
    address: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    phone: { type: String, required: true, unique: true},
    password: {type: String, require: true},
    role_id: {type: ObjectId, ref: 'Role', require: true}
})

module.exports = mongoose.model('User', UserSchema);

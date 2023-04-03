const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    name: { type: String, required: true , unique: true},
    address: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    phone: { type: String, required: true, unique: true},
    password: {type: String, require: true},
    refreshToken: { type: String, default: null },
    roleId: { type: ObjectId, ref: 'Role'}
});

module.exports = mongoose.model('User', UserSchema);

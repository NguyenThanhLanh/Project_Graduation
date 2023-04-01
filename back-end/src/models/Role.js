const mongoose = require('mongoose')
const Schema  = mongoose.Schema;

const RoleSchema = Schema({
    name: { type: String, require: true, unique: true}
});

module.exports = new mongoose.model('Role', RoleSchema);
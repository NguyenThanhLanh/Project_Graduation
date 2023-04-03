const mongoose = require('mongoose')
const Schema  = mongoose.Schema;

const RoleSchema = Schema({
    name: { type: String, require: true, unique: true}
});

module.exports = mongoose.model('Role', RoleSchema);